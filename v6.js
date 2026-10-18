/* PureMusic V6.2 — title-based artwork fallback, lyrics, background-friendly visualizer. */
(()=>{'use strict';
const el=id=>document.getElementById(id), player=el('fullPlayer'), media=el('audio');
const pmIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);const visual=document.createElement('canvas');visual.id='pm6Visualizer';visual.className='pm6-idle';visual.setAttribute('aria-label','Hiệu ứng phổ âm thanh');// Insert below the current song metadata.
const info=player.querySelector('.full-info');info.parentNode.insertBefore(visual,info.nextSibling);
const badge=document.createElement('div');badge.id='pm6Badge';info.querySelector('div')?.append(badge);
const coverSource=document.createElement('div');coverSource.id='pm6CoverSource';player.querySelector('.full-art-holder').after(coverSource);
const card=document.createElement('section');card.id='pm6LyricsCard';card.innerHTML='<h3>♫ Lời bài hát</h3><div id="pm6LyricsPreview"><div class="pm6-placeholder">Đang chờ bài hát…</div></div><button id="pm6LyricsOpen">Xem lời bài hát</button>';
player.append(card);
const full=document.createElement('section');full.id='pm6FullLyrics';full.innerHTML='<button id="pm6CloseLyrics">⌄ Đóng</button><h2>Lời bài hát</h2><div id="pm6LyricsScroll"></div>';document.body.append(full);
el('pm6LyricsOpen').onclick=()=>{full.classList.add('open');renderLyrics(true)};el('pm6CloseLyrics').onclick=()=>full.classList.remove('open');
const metaCache=new Map(),artCache=new Map(),lyricsCache=new Map();let activeKey='',lines=[],plain='',artObject=null,epoch=0;
const key=s=>s.provider+':'+s.id;
function cleanTitle(t){return (t||'').replace(/^\s*\d+[.\-_ ]+/,'').replace(/\s*[\[(](?:disco|remix|lossless|flac|320kbps|official audio|lyrics|dj mix|extended mix)[^\])]*[\])]/ig,'').replace(/\s+/g,' ').trim()}
function utf8(a){return new TextDecoder('utf-8').decode(a)}
function parseFlac(blob){return blob.slice(0,Math.min(blob.size,12*1024*1024)).arrayBuffer().then(buf=>{const d=new DataView(buf),u=new Uint8Array(buf);if(utf8(u.slice(0,4))!=='fLaC')return {};let p=4,out={},picture=null;const le=(pos)=>d.getUint32(pos,true);for(let n=0;n<40&&p+4<=u.length;n++){const head=u[p],last=!!(head&128),type=head&127,len=(u[p+1]<<16)|(u[p+2]<<8)|u[p+3];p+=4;if(p+len>u.length)break;if(type===4&&len>8){let o=p+4;const vendor=le(p);o+=vendor;if(o+4<=p+len){const count=Math.min(le(o),500);o+=4;for(let i=0;i<count&&o+4<=p+len;i++){let size=le(o);o+=4;if(size>200000||o+size>p+len)break;const entry=utf8(u.slice(o,o+size));o+=size;const at=entry.indexOf('=');if(at>0){const k=entry.slice(0,at).toUpperCase();if(['TITLE','ARTIST','ALBUM','ALBUMARTIST'].includes(k))out[k]=entry.slice(at+1)}}}}if(type===6&&len>32){let o=p;const be=()=>{const x=d.getUint32(o,false);o+=4;return x};try{be();let m=be();if(m>200||o+m>p+len)throw 0;const mime=utf8(u.slice(o,o+m));o+=m;let desc=be();o+=desc;o+=16;const size=be();if(size>0&&size<7*1024*1024&&o+size<=p+len&&mime.startsWith('image/'))picture=new Blob([u.slice(o,o+size)],{type:mime})}catch{}}p+=len;if(last)break}return {title:out.TITLE,artist:out.ARTIST||out.ALBUMARTIST,album:out.ALBUM,picture}})}
async function folderArt(s){if(s.provider!=='google'||!tokens.google)return null;try{const r=await api('https://www.googleapis.com/drive/v3/files/'+encodeURIComponent(s.id)+'?fields=parents','google');const parent=r.parents?.[0];if(!parent)return null;const q=new URLSearchParams({q:`'${parent.replace(/'/g,"\\'")}' in parents and trashed = false`,fields:'files(id,name,mimeType),nextPageToken',pageSize:'100'});const list=await api('https://www.googleapis.com/drive/v3/files?'+q,'google');const f=(list.files||[]).find(x=>/^(cover|folder|front|album)\.(jpg|jpeg|png|webp)$/i.test(x.name));if(!f)return null;const img=await fetch('https://www.googleapis.com/drive/v3/files/'+encodeURIComponent(f.id)+'?alt=media',{headers:{Authorization:'Bearer '+tokens.google}});return img.ok?await img.blob():null}catch{return null}}
async function onlineCover(s){
  const title=cleanTitle(s.title||s.name||'');
  if(!title)return null;
  const norm=x=>(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
  const target=norm(title), artist=s.artist&&s.artist!=='Nghệ sĩ chưa rõ'?norm(s.artist):'';
  const queries=artist?[title+' '+s.artist,title]:[title];
  for(const term of queries){
    try{
      const q=new URLSearchParams({term,entity:'song',media:'music',limit:'50',country:'VN'});
      const response=await fetch('https://itunes.apple.com/search?'+q,{cache:'force-cache'});
      if(!response.ok)continue;
      const data=await response.json();
      const matches=(data.results||[]).filter(x=>norm(x.trackName)===target&&x.artworkUrl100);
      if(!matches.length)continue;
      matches.sort((a,b)=>{
        const score=x=>artist?(norm(x.artistName)===artist?4:norm(x.artistName).includes(artist)?2:0):0;
        return score(b)-score(a);
      });
      // With no artist metadata, the first exact-title result is an illustrative cover,
      // not a verified match to the specific recording.
      const match=artist?matches.find(x=>norm(x.artistName).includes(artist)):matches[0];
      if(match)return {src:match.artworkUrl100.replace(/100x100bb/,'600x600bb'),label:artist?'Ảnh album trực tuyến':'Ảnh gợi ý theo tên bài (chưa xác minh ca sĩ)'};
    }catch(e){console.warn('Cover lookup:',e)}
  }
  return null;
}
async function coverFor(s,blob,tag,myEpoch){
  const k=key(s);let src=null,label='';
  if(tag.picture){src=URL.createObjectURL(tag.picture);label='Ảnh bìa trong FLAC'}
  if(!src){const b=await folderArt(s);if(b){src=URL.createObjectURL(b);label='Ảnh từ thư mục Drive'}}
  if(!src){const result=await onlineCover(s);if(result){src=result.src;label=result.label}}
  if(!src)return null;
  const old=artCache.get(k);
  if(old?.src?.startsWith('blob:')&&old.src!==src)URL.revokeObjectURL(old.src);
  artCache.set(k,{src,label});
  if(myEpoch===epoch)showArt(src,label);
  return {src,label};
}
function showArt(src,label){el('fullArt').src=src;el('miniArt').src=src;coverSource.textContent=label;const img=new Image();img.onload=()=>{try{const c=document.createElement('canvas');c.width=c.height=24;const x=c.getContext('2d');x.drawImage(img,0,0,24,24);const data=x.getImageData(0,0,24,24).data;let r=0,g=0,b=0,n=0;for(let i=0;i<data.length;i+=16){r+=data[i];g+=data[i+1];b+=data[i+2];n++}player.style.setProperty('--pm-glow',`rgb(${Math.round(r/n*.65)},${Math.round(g/n*.65)},${Math.round(b/n*.65)})`)}catch{}};img.src=src}
function lrc(text){const result=[];for(const line of (text||'').split(/\r?\n/)){const stamps=[...line.matchAll(/\[(\d{1,3}):(\d{2})(?:[.:](\d{1,3}))?\]/g)];const words=line.replace(/\[[^\]]*\]/g,'').trim();if(!words)continue;for(const t of stamps)result.push({time:Number(t[1])*60+Number(t[2])+Number('0.'+(t[3]||'0')),text:words})}return result.sort((a,b)=>a.time-b.time)}
async function fetchLyrics(s,myEpoch){const k=key(s);if(lyricsCache.has(k)){if(epoch===myEpoch)setLyrics(lyricsCache.get(k));return}const title=cleanTitle(s.title),artist=s.artist==='Nghệ sĩ chưa rõ'?'':s.artist;let data=null;try{const q=new URLSearchParams({track_name:title,artist_name:artist});if(Number.isFinite(media.duration)&&media.duration>0)q.set('duration',String(Math.round(media.duration)));let r=await fetch('https://lrclib.net/api/get?'+q);if(r.ok)data=await r.json();if(!data){const search=await fetch('https://lrclib.net/api/search?'+new URLSearchParams({track_name:title,artist_name:artist}));if(search.ok){const results=await search.json();const norm=x=>(x||'').toLocaleLowerCase().replace(/[^\p{L}\p{N}]/gu,'');data=results.find(x=>norm(x.trackName)===norm(title)&&(artist?norm(x.artistName)===norm(artist):true)&&(!media.duration||Math.abs(x.duration-media.duration)<12))||null}}}catch{}const value={lines:lrc(data?.syncedLyrics),plain:data?.plainLyrics||'',found:!!data};lyricsCache.set(k,value);if(epoch===myEpoch)setLyrics(value)}
function setLyrics(v){lines=v.lines;plain=v.plain;renderLyrics(true)}
function renderLyrics(force=false){const preview=el('pm6LyricsPreview'),scroll=el('pm6LyricsScroll');const time=media.currentTime||0;const i=lines.length?Math.max(0,lines.findLastIndex(x=>x.time<=time)):-1;const state=i+':'+lines.length+':'+(plain?1:0);if(!force&&renderLyrics.last===state)return;renderLyrics.last=state;preview.replaceChildren();scroll.replaceChildren();if(lines.length){for(let j=i;j<Math.min(lines.length,i+4);j++){const d=document.createElement('div');d.textContent=lines[j].text;d.className=j===i?'pm6-active':'pm6-dim';preview.append(d)}lines.forEach((l,j)=>{const d=document.createElement('div');d.textContent=l.text;d.className='pm6-line'+(j===i?' current':'');scroll.append(d)});if(full.classList.contains('open'))scroll.querySelector('.current')?.scrollIntoView({block:'center',behavior:'smooth'})}else{const d=document.createElement('div');d.className='pm6-placeholder';d.textContent=plain||'Chưa tìm thấy lời phù hợp. Nhạc remix hoặc file thiếu tên nghệ sĩ có thể không có lời đồng bộ.';preview.append(d);scroll.textContent=plain||'Chưa có lời bài hát.'}}
async function enrich(s,myEpoch){let tag={};try{if(/\.flac$/i.test(s.name)){const blob=await getBlob(s);tag=await parseFlac(blob)}}catch{}if(epoch!==myEpoch)return;metaCache.set(key(s),tag);if(tag.title)s.title=tag.title;if(tag.artist)s.artist=tag.artist;if(tag.album)s.album=tag.album;el('fullTitle').textContent=s.title;el('fullArtist').textContent=s.artist;el('fullAlbum').textContent=s.album||'ĐANG PHÁT TỪ CLOUD';el('now').textContent=s.title+' · '+s.artist;el('miniArtist').textContent=s.artist;badge.textContent=/\.flac$/i.test(s.name)?'FLAC · CLOUD':'CLOUD AUDIO';render();await Promise.allSettled([coverFor(s,null,tag,myEpoch),fetchLyrics(s,myEpoch)])}
const originalPlay=play;play=async function(i){const s=songs[i];if(!s)return;const e=++epoch;activeKey=key(s);lines=[];plain='';renderLyrics.last='';el('pm6LyricsPreview').textContent='Đang tìm lời bài hát…';el('fullArt').src=coverPlaceholder;el('miniArt').src=coverPlaceholder;coverSource.textContent='';player.style.setProperty('--pm-glow','#4a294d');const p=originalPlay(i);const cached=artCache.get(key(s));if(cached)showArt(cached.src,cached.label);else onlineCover(s).then(result=>{if(result&&e===epoch&&!artCache.has(key(s)))showArt(result.src,result.label)}).catch(()=>{});enrich(s,e).catch(err=>console.warn('Metadata:',err));await p};
// Actual frequency-domain visualizer uses the shared Web Audio analyser created by Audio Lab.
const canvas=visual,context=canvas.getContext('2d');let raf=0;function draw(){const w=canvas.clientWidth,h=canvas.clientHeight,dpr=Math.min(devicePixelRatio||1,2);if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=w*dpr;canvas.height=h*dpr}context.setTransform(dpr,0,0,dpr,0,0);context.clearRect(0,0,w,h);const analyser=window.pm6Analyser;const live=analyser&&analyser.context.state==='running'&&!media.paused;const values=live?new Uint8Array(analyser.frequencyBinCount):null;if(values)analyser.getByteFrequencyData(values);const bars=54,gap=3,bw=(w-gap*(bars-1))/bars;for(let i=0;i<bars;i++){let amp=live?values[Math.min(values.length-1,Math.floor(Math.pow(i/bars,1.6)*values.length*.65))]/255:0.055;const bh=Math.max(3,amp*h*.91);const x=i*(bw+gap),y=(h-bh)/2;context.fillStyle=i<bars*(media.duration?media.currentTime/media.duration:0)?'#1be5ed':'rgba(244,241,248,.78)';context.beginPath();context.roundRect(x,y,bw,bh,bw/2);context.fill()}visual.classList.toggle('pm6-idle',!live);raf=requestAnimationFrame(draw)}
function animate(){if(document.hidden||media.paused){cancelAnimationFrame(raf);raf=0;return;}if(!raf)draw()}animate();media.addEventListener('play',()=>{player.classList.add('pm-playing');animate()});media.addEventListener('pause',()=>{player.classList.remove('pm-playing');cancelAnimationFrame(raf);raf=0;});document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else if(!media.paused)animate()});media.addEventListener('timeupdate',()=>renderLyrics());
window.addEventListener('pagehide',()=>{cancelAnimationFrame(raf);raf=0});
})();
