'use strict';
const $=id=>document.getElementById(id),names={ours:'Percent-General-9B',jev:'Jev 1.13.0',startlux:'StartLux-Decision-v1-27B'};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fetchJSON=async url=>{const r=await fetch(url);if(!r.ok)throw new Error('资源加载失败：'+r.status);return r.json();};
let catalog=[],cache=new Map(),current=null,index=0,start=0,playing=false,timer=null,version=0,pieces=null;
function stop(){playing=false;clearTimeout(timer);timer=null;$('play').textContent='播放';}
function max(){return current.kind==='workflow'?Math.max(...Object.values(current.episodes).map(e=>e.frames.length-1)):current.frames.length-1;}
function now(side){if(current.kind==='workflow'){const fs=current.episodes[side].frames;return fs[Math.min(index,fs.length-1)];}return current.frames[index];}
function fenBoard(fen){return fen.split(' ')[0].split('/').map(row=>row.replace(/\d/g,n=>'.'.repeat(Number(n))));}
function boardHTML(){
 const f=now(),board=current.kind==='chess'?fenBoard(f.fen):f.board,rows=board.length,cols=board[0].length,chess=current.kind==='chess';
 const ours=chess?'黑棋':current.game==='tic_tac_toe'?(current.oursPiece==='X'?'先手 X':'后手 O'):current.oursPiece==='X'?'黑棋 X':'白棋 O';
 const other=chess?'白棋':current.oursPiece==='X'?'O':'X';
 let html='<div class="players"><b><i class="dot '+(!chess&&current.oursPiece==='O'?'white':'')+'"></i>Percent-General-9B</b><span>'+ours+'</span></div>';
 let cells='';
 for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
  const value=board[r][c],coord=String.fromCharCode(97+c)+(chess?8-r:r+1);
  const last=chess?f.uci&&(coord===f.uci.slice(0,2)||coord===f.uci.slice(2,4)):f.last&&f.last[0]===r&&f.last[1]===c;
  const win=index===max()&&(current.winCells||[]).some(a=>a[0]===r&&a[1]===c);
  let piece='';
  if(chess&&value!=='.')piece='<div class="piece">'+pieces[value]+'</div>';
  else if(value!=='.'&&current.game==='tic_tac_toe')piece=value==='X'?'<span class="cross">×</span>':'<span class="circle"></span>';
  else if(value!=='.')piece='<span class="disk '+(value==='O'?'white ':'')+(last?'selected':'')+'"></span>';
  else if(current.game==='connect_four')piece='<span class="hole"></span>';
  const label=c===0?(chess?8-r:current.game==='othello'?r+1:''):'';
  cells+='<div class="sq '+((r+c)%2?'dark ':'')+(last?'last ':'')+(win?'win ':'')+(f.check===coord?'check':'')+'" data-square="'+coord+'" data-piece="'+value+'" aria-label="'+coord+' '+value+'">'+piece+'<small>'+label+'</small></div>';
 }
 const cls=chess?'':current.game==='tic_tac_toe'?'ttt':current.game==='connect_four'?'connect':'othello';
 html+='<div class="board '+cls+'" style="grid-template-columns:repeat('+cols+',1fr)" role="img" aria-label="真实轨迹棋盘">'+cells+'</div>';
 html+='<div class="players" style="margin:10px 0 0"><b><i class="dot '+(chess||current.oursPiece==='X'?'white':'')+'"></i>'+esc(current.opponent)+'</b><span>'+other+'</span></div>';
 const note=current.game==='othello'?'棋子数量 · 黑 '+(f.counts?.X??2)+' / 白 '+(f.counts?.O??2):index===max()?current.result[0].text:'真实走法回放';
 return html+'<p class="board-note">'+esc(note)+'</p>';
}
const pageNames={catalog:'商品列表',detail:'商品详情',cart:'购物车',checkout:'配送地址',review:'订单确认',receipt:'订单回执'};
function money(n){return (Number(n)/100).toFixed(2);}
function goods(p,selected){return '<div class="goods '+(selected?'selected':'')+'"><h5>'+esc(p.name)+'</h5><b>¥'+money(p.price_cents+p.shipping_cents)+'</b><small>'+(p.shipping_cents===0?'包邮':'含运费')+' · '+p.delivery_days+'天送达 · '+(p.stock?'有货':'售罄')+'</small></div>';}
function shoppingState(state){
 const tags='<div class="tags"><span class="'+(state.free_only?'on':'')+'">包邮筛选</span><span class="'+(state.sort_price?'on':'')+'">价格升序</span></div>';
 let products=state.products||[],body='';
 const selected=state.order?.product||products.find(p=>p.id===(state.cart||state.viewing));
 if(state.order){
  body='<div class="receipt"><b>模拟订单回执</b><dl><dt>商品与数量</dt><dd>'+esc(state.order.product.name)+' × '+esc(state.order.quantity)+'</dd><dt>配送地址</dt><dd>'+esc(state.order.address)+'</dd><dt>实付</dt><dd>¥ '+money(state.order.paid_cents)+'</dd></dl><span>'+(state.receipt_checked?'✓ 回执已核对':'等待核对回执')+'</span></div>';
 }else if(selected&&state.page!=='catalog'){
  body=goods(selected,true)+'<div class="tags"><span>'+(state.cart?'已加入购物车':'待加入购物车')+'</span><span>'+(state.address?esc(state.address):'未选地址')+'</span></div>';
 }else{
  if(state.free_only)products=products.filter(p=>p.shipping_cents===0);
  if(state.sort_price)products=[...products].sort((a,b)=>a.price_cents+a.shipping_cents-b.price_cents-b.shipping_cents);
  body=products.map(p=>goods(p,p.id===(state.viewing||state.cart))).join('');
 }
 return '<h4>'+esc(pageNames[state.page]||state.page)+'</h4>'+tags+body+(state.closed?'<div class="closed">已完成 · 订单、金额、地址核验通过</div>':'');
}
function supportState(state){
 const read=state.read||[],facts=current.case.facts;
 const panels=[['read_order','订单资料','普通商品 · '+(facts.quality_issue?'有':'无')+'质量问题'],['read_tracking','物流签收','已签收 '+facts.received_days+' 天'],['read_history','历史售后',facts.already_refunded?'已有全额退款':'无已完成退款'],['read_policy','售后政策','普通退货从签收起算，期限7天']];
 let body=panels.map(([key,label,text])=>'<div class="info '+(read.includes(key)?'':'pending')+'"><b>'+label+(read.includes(key)?' ✓':'')+'</b><span>'+(read.includes(key)?esc(text):'面板尚未读取')+'</span></div>').join('');
 const label={deny:'拒绝超期普通退货',refund:'退款',reship:'补发',existing_refund:'告知已有退款'}[state.resolution]||'尚未形成处理单';
 body+='<div class="receipt"><b>'+label+'</b><div>'+(state.verified?'✓ 处理回执已核验':'回执未核验')+'</div></div>';
 if(state.closed)body+='<div class="closed">已通知并关闭工单 · 零违规</div>';
 return body;
}
function workflowHTML(){
 const goal=current.id==='shopping-notebook'?current.case.goal:current.case.ticket+' 本次任务：取得事实、正确处理、核验并关闭。';
 const panels=['ours','jev'].map(side=>{
  const f=now(side),e=current.episodes[side],done=index>=e.frames.length-1;
  const body=current.id==='shopping-notebook'?shoppingState(f.state):supportState(f.state);
  return '<div class="workflow-card '+side+'" data-side="'+side+'"><div class="workflow-head"><b>'+names[side]+'</b><span>'+(done?e.outcome.success?'已完成':'达到上限':'第 '+f.step+' 步')+'</span></div><div class="workflow-body">'+body+'<div class="flow-action"><b>'+(f.step?f.step+'. ':'')+esc(f.label)+'</b><p>'+esc(f.feedback||'相同初始任务与规则')+'</p></div></div></div>';
 }).join('');
 return '<div class="task"><strong>实际任务 · 仿真回放</strong>'+esc(goal)+'</div><div class="workflow">'+panels+'</div>';
}
function shortAction(f){
 if(!index||index===start&&start>0)return current.kind==='chess'&&start?'第 35 回合开始前':'初始状态';
 if(current.kind==='chess')return f.san;
 if(current.kind==='board'){
  if(!f.last)return '按规则过手';
  return current.game==='connect_four'?'落入第 '+(f.last[1]+1)+' 列':current.game==='tic_tac_toe'?'第 '+(f.last[0]+1)+' 行，第 '+(f.last[1]+1)+' 列':String.fromCharCode(97+f.last[1])+(f.last[0]+1);
 }
 return f.label;
}
function renderDecision(){
 const side=$('inspect').value,f=now(side),initial=index===0||index===start&&start>0;
 $('actor').textContent=initial?'相同规则下的真实初始状态':current.kind==='workflow'?names[side]+' · 第 '+f.step+' 步':(names[f.actor]||'开局预置')+' · 第 '+f.step+' 步';
 $('action').textContent=shortAction(f);
 $('feedback').textContent=initial?'播放后显示实际执行的动作与模型候选概率。':current.kind==='chess'&&index===max()?'模型选项 Rxd1+，规则重放确认 Rxd1#。':f.feedback||f.label;
 $('source').textContent=initial?'真实记录回放':f.source==='actual_model'?'来源：实际模型响应':f.source==='book'?'来源：开局预置':'来源：唯一合法规则步骤 · 无模型概率';
 const list=initial?[]:f.options||[];
 $('probabilities').innerHTML=list.length?'<p class="eyebrow">候选选择概率 · 前 3 项</p>'+list.slice(0,3).map(o=>'<div class="prob '+(o.chosen?'chosen':'')+'"><div><span title="'+esc(o.label)+'">'+esc(o.label)+'</span><b>'+(o.p*100).toFixed(2)+'%</b></div><div class="bar"><i style="width:'+Math.max(.4,o.p*100)+'%"></i></div></div>').join(''):'<p class="board-note">本步没有模型概率。</p>';
 
}

function render(){
 $('visual').innerHTML=current.kind==='workflow'?workflowHTML():boardHTML();
 $('progress').textContent=(index-start)+' / '+(max()-start)+(current.kind==='chess'?' 半步':' 步');
 $('seek').min=String(start);$('seek').max=String(max());$('seek').value=String(index);
 $('prev').disabled=index<=start;$('next').disabled=index>=max();renderDecision();
}
function queue(delay){
 clearTimeout(timer);timer=setTimeout(()=>{
  if(!playing||!current)return;
  if(index>=max()){index=start;render();queue(1300);return;}
  index++;render();queue(index===max()?4000:Number($('speed').value));
 },delay);
}
function play(){if(playing){stop();return;}playing=true;$('play').textContent='暂停';if(index===max())index=start;render();queue(1000);}
function jump(value){stop();index=Math.max(start,Math.min(max(),value));render();}
function changeMode(clip){stop();start=clip?current.clipStart:0;index=start;$('clip').classList.toggle('active',clip);$('full').classList.toggle('active',!clip);render();play();}
async function choose(id){
 const token=++version;stop();current=null;$('visual').innerHTML='<p>正在载入真实轨迹…</p>';
 document.querySelectorAll('#cases button').forEach(b=>{const active=b.dataset.case===id;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
 try{
  if(!cache.has(id))cache.set(id,await fetchJSON('data/'+id+'.json'));
  if(id==='chess'&&!pieces)pieces=await fetchJSON('data/chess-pieces.json');
  if(token!==version)return;
  current=cache.get(id);index=start=current.clipStart||0;
  $('title').textContent=current.title;$('tag').textContent=current.tag;$('summary').textContent=current.summary;$('opponent').textContent='对手 · '+current.opponent;
    $('note').textContent=current.note;$('statistics').textContent='来源的完整探索结果 · '+current.statistics;$('result').innerHTML=current.result.map(r=>'<div class="result"><b>'+esc(r.model)+'</b><span>'+esc(r.text)+'</span><small>'+esc(r.detail)+'</small></div>').join('');
  $('inspect').hidden=current.kind!=='workflow';$('inspect').value='ours';
  $('clip').hidden=current.kind!=='chess';$('clip').classList.toggle('active',current.kind==='chess');$('full').classList.toggle('active',current.kind!=='chess');
  $('gif').href='media/'+id+'.gif';$('record').href='data/'+id+'.json';
  history.replaceState(null,'','#'+id);render();if(!matchMedia('(prefers-reduced-motion: reduce)').matches)play();
 }catch(e){$('visual').textContent=e.message+'。请刷新重试。';}
}
$('play').onclick=()=>current&&play();$('prev').onclick=()=>current&&jump(index-1);$('next').onclick=()=>current&&jump(index+1);
$('restart').onclick=()=>{if(current){jump(start);play();}};$('end').onclick=()=>current&&jump(max());
$('seek').oninput=()=>current&&jump(Number($('seek').value));$('speed').onchange=()=>{if(playing)queue(Number($('speed').value));};
$('clip').onclick=()=>current&&changeMode(true);$('full').onclick=()=>current&&changeMode(false);$('inspect').onchange=()=>current&&renderDecision();

async function init(){
 try{
  catalog=await fetchJSON('data/catalog.json');
  $('cases').innerHTML=catalog.map((c,i)=>'<button data-case="'+c.id+'" aria-label="'+esc(c.title)+'"><span>0'+(i+1)+'</span><strong>'+esc(c.title)+'</strong><small>'+esc(c.tag)+'</small></button>').join('');
  document.querySelectorAll('#cases button').forEach(b=>b.onclick=()=>choose(b.dataset.case));
  $('gif-grid').innerHTML=catalog.map(c=>'<article class="gif-card"><a href="media/'+c.id+'.gif"><img loading="lazy" src="media/'+c.id+'.png" alt="'+esc(c.title)+'真实成功结果"></a><div><b>'+esc(c.title)+'</b><p>Percent-General-9B vs '+esc(c.opponent)+'</p><div class="actions"><a href="media/'+c.id+'.gif" download>下载 GIF</a><a href="#'+c.id+'" data-replay="'+c.id+'">查看轨迹 ↗</a></div></div></article>').join('');
  document.querySelectorAll('[data-replay]').forEach(a=>a.onclick=e=>{e.preventDefault();choose(a.dataset.replay);$('demo').scrollIntoView({behavior:'smooth',block:'start'});});
  const initial=location.hash.slice(1);choose(catalog.some(c=>c.id===initial)?initial:'chess');
 }catch(e){$('visual').textContent=e.message;}
}
init();
