var Pl=Object.defineProperty;var Ll=(i,e,t)=>e in i?Pl(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var U=(i,e,t)=>Ll(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Gs="160",Dl=0,ia=1,Ul=2,Oo=1,Il=2,on=3,bn=0,Pt=1,ln=2,Mn=0,pi=1,Tr=2,ra=3,sa=4,Fl=5,Fn=100,Nl=101,Ol=102,aa=103,oa=104,Bl=200,zl=201,Gl=202,Hl=203,Es=204,ys=205,Vl=206,kl=207,Wl=208,Xl=209,ql=210,Yl=211,Zl=212,Kl=213,jl=214,$l=0,Jl=1,Ql=2,br=3,ec=4,tc=5,nc=6,ic=7,Bo=0,rc=1,sc=2,En=0,ac=1,oc=2,lc=3,cc=4,hc=5,uc=6,zo=300,vi=301,xi=302,Ts=303,bs=304,Ur=306,ws=1e3,Yt=1001,As=1002,wt=1003,la=1004,Vr=1005,Bt=1006,dc=1007,Fi=1008,yn=1009,fc=1010,pc=1011,Hs=1012,Go=1013,xn=1014,Sn=1015,Ni=1016,Ho=1017,Vo=1018,zn=1020,mc=1021,Zt=1023,gc=1024,_c=1025,Gn=1026,Si=1027,vc=1028,ko=1029,xc=1030,Wo=1031,Xo=1033,kr=33776,Wr=33777,Xr=33778,qr=33779,ca=35840,ha=35841,ua=35842,da=35843,qo=36196,fa=37492,pa=37496,ma=37808,ga=37809,_a=37810,va=37811,xa=37812,Sa=37813,Ma=37814,Ea=37815,ya=37816,Ta=37817,ba=37818,wa=37819,Aa=37820,Ra=37821,Yr=36492,Ca=36494,Pa=36495,Sc=36283,La=36284,Da=36285,Ua=36286,Yo=3e3,Hn=3001,Mc=3200,Ec=3201,yc=0,Tc=1,Gt="",pt="srgb",dn="srgb-linear",Vs="display-p3",Ir="display-p3-linear",wr="linear",Je="srgb",Ar="rec709",Rr="p3",qn=7680,Ia=519,bc=512,wc=513,Ac=514,Zo=515,Rc=516,Cc=517,Pc=518,Lc=519,Rs=35044,Fa="300 es",Cs=1035,cn=2e3,Cr=2001;class Ei{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const _t=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Na=1234567;const mi=Math.PI/180,Oi=180/Math.PI;function un(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(_t[i&255]+_t[i>>8&255]+_t[i>>16&255]+_t[i>>24&255]+"-"+_t[e&255]+_t[e>>8&255]+"-"+_t[e>>16&15|64]+_t[e>>24&255]+"-"+_t[t&63|128]+_t[t>>8&255]+"-"+_t[t>>16&255]+_t[t>>24&255]+_t[n&255]+_t[n>>8&255]+_t[n>>16&255]+_t[n>>24&255]).toLowerCase()}function At(i,e,t){return Math.max(e,Math.min(t,i))}function ks(i,e){return(i%e+e)%e}function Dc(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function Uc(i,e,t){return i!==e?(t-i)/(e-i):0}function Di(i,e,t){return(1-t)*i+t*e}function Ic(i,e,t,n){return Di(i,e,1-Math.exp(-t*n))}function Fc(i,e=1){return e-Math.abs(ks(i,e*2)-e)}function Nc(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Oc(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Bc(i,e){return i+Math.floor(Math.random()*(e-i+1))}function zc(i,e){return i+Math.random()*(e-i)}function Gc(i){return i*(.5-Math.random())}function Hc(i){i!==void 0&&(Na=i);let e=Na+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Vc(i){return i*mi}function kc(i){return i*Oi}function Ps(i){return(i&i-1)===0&&i!==0}function Wc(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Pr(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Xc(i,e,t,n,r){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),h=o((e+n)/2),d=s((e-n)/2),f=o((e-n)/2),m=s((n-e)/2),g=o((n-e)/2);switch(r){case"XYX":i.set(a*h,l*d,l*f,a*c);break;case"YZY":i.set(l*f,a*h,l*d,a*c);break;case"ZXZ":i.set(l*d,l*f,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*m,a*c);break;case"YXY":i.set(l*m,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*m,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Qt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ye(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Ht={DEG2RAD:mi,RAD2DEG:Oi,generateUUID:un,clamp:At,euclideanModulo:ks,mapLinear:Dc,inverseLerp:Uc,lerp:Di,damp:Ic,pingpong:Fc,smoothstep:Nc,smootherstep:Oc,randInt:Bc,randFloat:zc,randFloatSpread:Gc,seededRandom:Hc,degToRad:Vc,radToDeg:kc,isPowerOfTwo:Ps,ceilPowerOfTwo:Wc,floorPowerOfTwo:Pr,setQuaternionFromProperEuler:Xc,normalize:Ye,denormalize:Qt};class Se{constructor(e=0,t=0){Se.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(At(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class He{constructor(e,t,n,r,s,o,a,l,c){He.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c)}set(e,t,n,r,s,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=a,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],f=n[2],m=n[5],g=n[8],_=r[0],p=r[3],u=r[6],T=r[1],M=r[4],b=r[7],P=r[2],A=r[5],w=r[8];return s[0]=o*_+a*T+l*P,s[3]=o*p+a*M+l*A,s[6]=o*u+a*b+l*w,s[1]=c*_+h*T+d*P,s[4]=c*p+h*M+d*A,s[7]=c*u+h*b+d*w,s[2]=f*_+m*T+g*P,s[5]=f*p+m*M+g*A,s[8]=f*u+m*b+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*s*h+n*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=h*o-a*c,f=a*l-h*s,m=c*s-o*l,g=t*d+n*f+r*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(r*c-h*n)*_,e[2]=(a*n-r*o)*_,e[3]=f*_,e[4]=(h*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=m*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Zr.makeScale(e,t)),this}rotate(e){return this.premultiply(Zr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Zr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Zr=new He;function Ko(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Lr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function qc(){const i=Lr("canvas");return i.style.display="block",i}const Oa={};function Ui(i){i in Oa||(Oa[i]=!0,console.warn(i))}const Ba=new He().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),za=new He().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Xi={[dn]:{transfer:wr,primaries:Ar,toReference:i=>i,fromReference:i=>i},[pt]:{transfer:Je,primaries:Ar,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Ir]:{transfer:wr,primaries:Rr,toReference:i=>i.applyMatrix3(za),fromReference:i=>i.applyMatrix3(Ba)},[Vs]:{transfer:Je,primaries:Rr,toReference:i=>i.convertSRGBToLinear().applyMatrix3(za),fromReference:i=>i.applyMatrix3(Ba).convertLinearToSRGB()}},Yc=new Set([dn,Ir]),Ze={enabled:!0,_workingColorSpace:dn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Yc.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Xi[e].toReference,r=Xi[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Xi[i].primaries},getTransfer:function(i){return i===Gt?wr:Xi[i].transfer}};function gi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Kr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Yn;class jo{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Yn===void 0&&(Yn=Lr("canvas")),Yn.width=e.width,Yn.height=e.height;const n=Yn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Yn}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Lr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=gi(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(gi(t[n]/255)*255):t[n]=gi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Zc=0;class $o{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Zc++}),this.uuid=un(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(jr(r[o].image)):s.push(jr(r[o]))}else s=jr(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function jr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?jo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Kc=0;class Lt extends Ei{constructor(e=Lt.DEFAULT_IMAGE,t=Lt.DEFAULT_MAPPING,n=Yt,r=Yt,s=Bt,o=Fi,a=Zt,l=yn,c=Lt.DEFAULT_ANISOTROPY,h=Gt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kc++}),this.uuid=un(),this.name="",this.source=new $o(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Se(0,0),this.repeat=new Se(1,1),this.center=new Se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Ui("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Hn?pt:Gt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==zo)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ws:e.x=e.x-Math.floor(e.x);break;case Yt:e.x=e.x<0?0:1;break;case As:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ws:e.y=e.y-Math.floor(e.y);break;case Yt:e.y=e.y<0?0:1;break;case As:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ui("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===pt?Hn:Yo}set encoding(e){Ui("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Hn?pt:Gt}}Lt.DEFAULT_IMAGE=null;Lt.DEFAULT_MAPPING=zo;Lt.DEFAULT_ANISOTROPY=1;class mt{constructor(e=0,t=0,n=0,r=1){mt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],h=l[4],d=l[8],f=l[1],m=l[5],g=l[9],_=l[2],p=l[6],u=l[10];if(Math.abs(h-f)<.01&&Math.abs(d-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(d+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,b=(m+1)/2,P=(u+1)/2,A=(h+f)/4,w=(d+_)/4,q=(g+p)/4;return M>b&&M>P?M<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(M),r=A/n,s=w/n):b>P?b<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),n=A/r,s=q/r):P<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(P),n=w/s,r=q/s),this.set(n,r,s,t),this}let T=Math.sqrt((p-g)*(p-g)+(d-_)*(d-_)+(f-h)*(f-h));return Math.abs(T)<.001&&(T=1),this.x=(p-g)/T,this.y=(d-_)/T,this.z=(f-h)/T,this.w=Math.acos((c+m+u-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class jc extends Ei{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t);const r={width:e,height:t,depth:1};n.encoding!==void 0&&(Ui("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Hn?pt:Gt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Lt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new $o(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Vn extends jc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Jo extends Lt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=wt,this.minFilter=wt,this.wrapR=Yt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $c extends Lt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=wt,this.minFilter=wt,this.wrapR=Yt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class wn{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let l=n[r+0],c=n[r+1],h=n[r+2],d=n[r+3];const f=s[o+0],m=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(a===1){e[t+0]=f,e[t+1]=m,e[t+2]=g,e[t+3]=_;return}if(d!==_||l!==f||c!==m||h!==g){let p=1-a;const u=l*f+c*m+h*g+d*_,T=u>=0?1:-1,M=1-u*u;if(M>Number.EPSILON){const P=Math.sqrt(M),A=Math.atan2(P,u*T);p=Math.sin(p*A)/P,a=Math.sin(a*A)/P}const b=a*T;if(l=l*p+f*b,c=c*p+m*b,h=h*p+g*b,d=d*p+_*b,p===1-a){const P=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=P,c*=P,h*=P,d*=P}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,o){const a=n[r],l=n[r+1],c=n[r+2],h=n[r+3],d=s[o],f=s[o+1],m=s[o+2],g=s[o+3];return e[t]=a*g+h*d+l*m-c*f,e[t+1]=l*g+h*f+c*d-a*m,e[t+2]=c*g+h*m+a*f-l*d,e[t+3]=h*g-a*d-l*f-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(r/2),d=a(s/2),f=l(n/2),m=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=f*h*d+c*m*g,this._y=c*m*d-f*h*g,this._z=c*h*g+f*m*d,this._w=c*h*d-f*m*g;break;case"YXZ":this._x=f*h*d+c*m*g,this._y=c*m*d-f*h*g,this._z=c*h*g-f*m*d,this._w=c*h*d+f*m*g;break;case"ZXY":this._x=f*h*d-c*m*g,this._y=c*m*d+f*h*g,this._z=c*h*g+f*m*d,this._w=c*h*d-f*m*g;break;case"ZYX":this._x=f*h*d-c*m*g,this._y=c*m*d+f*h*g,this._z=c*h*g-f*m*d,this._w=c*h*d+f*m*g;break;case"YZX":this._x=f*h*d+c*m*g,this._y=c*m*d+f*h*g,this._z=c*h*g-f*m*d,this._w=c*h*d-f*m*g;break;case"XZY":this._x=f*h*d-c*m*g,this._y=c*m*d-f*h*g,this._z=c*h*g+f*m*d,this._w=c*h*d+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],d=t[10],f=n+a+d;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(h-l)*m,this._y=(s-c)*m,this._z=(o-r)*m}else if(n>a&&n>d){const m=2*Math.sqrt(1+n-a-d);this._w=(h-l)/m,this._x=.25*m,this._y=(r+o)/m,this._z=(s+c)/m}else if(a>d){const m=2*Math.sqrt(1+a-n-d);this._w=(s-c)/m,this._x=(r+o)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+d-n-a);this._w=(o-r)/m,this._x=(s+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(At(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+r*c-s*l,this._y=r*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-r*a,this._w=o*h-n*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-t;return this._w=m*o+t*this._w,this._x=m*n+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-t)*h)/c,f=Math.sin(t*h)/c;return this._w=o*d+this._w*f,this._x=n*d+this._x*f,this._y=r*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),n*Math.sin(s),n*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,n=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ga.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ga.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*n),h=2*(a*t-s*r),d=2*(s*n-o*t);return this.x=t+l*c+o*d-a*h,this.y=n+l*h+a*c-s*d,this.z=r+l*d+s*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return $r.copy(this).projectOnVector(e),this.sub($r)}reflect(e){return this.sub($r.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(At(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const $r=new R,Ga=new wn;class Xn{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Wt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Wt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Wt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Wt):Wt.fromBufferAttribute(s,o),Wt.applyMatrix4(e.matrixWorld),this.expandByPoint(Wt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),qi.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),qi.copy(n.boundingBox)),qi.applyMatrix4(e.matrixWorld),this.union(qi)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Wt),Wt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(bi),Yi.subVectors(this.max,bi),Zn.subVectors(e.a,bi),Kn.subVectors(e.b,bi),jn.subVectors(e.c,bi),fn.subVectors(Kn,Zn),pn.subVectors(jn,Kn),Cn.subVectors(Zn,jn);let t=[0,-fn.z,fn.y,0,-pn.z,pn.y,0,-Cn.z,Cn.y,fn.z,0,-fn.x,pn.z,0,-pn.x,Cn.z,0,-Cn.x,-fn.y,fn.x,0,-pn.y,pn.x,0,-Cn.y,Cn.x,0];return!Jr(t,Zn,Kn,jn,Yi)||(t=[1,0,0,0,1,0,0,0,1],!Jr(t,Zn,Kn,jn,Yi))?!1:(Zi.crossVectors(fn,pn),t=[Zi.x,Zi.y,Zi.z],Jr(t,Zn,Kn,jn,Yi))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Wt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Wt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(tn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),tn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),tn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),tn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),tn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),tn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),tn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),tn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(tn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const tn=[new R,new R,new R,new R,new R,new R,new R,new R],Wt=new R,qi=new Xn,Zn=new R,Kn=new R,jn=new R,fn=new R,pn=new R,Cn=new R,bi=new R,Yi=new R,Zi=new R,Pn=new R;function Jr(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){Pn.fromArray(i,s);const a=r.x*Math.abs(Pn.x)+r.y*Math.abs(Pn.y)+r.z*Math.abs(Pn.z),l=e.dot(Pn),c=t.dot(Pn),h=n.dot(Pn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Jc=new Xn,wi=new R,Qr=new R;class Gi{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Jc.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;wi.subVectors(e,this.center);const t=wi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(wi,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Qr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(wi.copy(e.center).add(Qr)),this.expandByPoint(wi.copy(e.center).sub(Qr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const nn=new R,es=new R,Ki=new R,mn=new R,ts=new R,ji=new R,ns=new R;class Ws{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,nn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=nn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(nn.copy(this.origin).addScaledVector(this.direction,t),nn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){es.copy(e).add(t).multiplyScalar(.5),Ki.copy(t).sub(e).normalize(),mn.copy(this.origin).sub(es);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Ki),a=mn.dot(this.direction),l=-mn.dot(Ki),c=mn.lengthSq(),h=Math.abs(1-o*o);let d,f,m,g;if(h>0)if(d=o*l-a,f=o*a-l,g=s*h,d>=0)if(f>=-g)if(f<=g){const _=1/h;d*=_,f*=_,m=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=s,d=Math.max(0,-(o*f+a)),m=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(o*f+a)),m=-d*d+f*(f+2*l)+c;else f<=-g?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-l),s),m=-d*d+f*(f+2*l)+c):f<=g?(d=0,f=Math.min(Math.max(-s,-l),s),m=f*(f+2*l)+c):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-l),s),m=-d*d+f*(f+2*l)+c);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),m=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(es).addScaledVector(Ki,f),m}intersectSphere(e,t){nn.subVectors(e.center,this.origin);const n=nn.dot(this.direction),r=nn.dot(nn)-n*n,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),h>=0?(s=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(s=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,nn)!==null}intersectTriangle(e,t,n,r,s){ts.subVectors(t,e),ji.subVectors(n,e),ns.crossVectors(ts,ji);let o=this.direction.dot(ns),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;mn.subVectors(this.origin,e);const l=a*this.direction.dot(ji.crossVectors(mn,ji));if(l<0)return null;const c=a*this.direction.dot(ts.cross(mn));if(c<0||l+c>o)return null;const h=-a*mn.dot(ns);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class at{constructor(e,t,n,r,s,o,a,l,c,h,d,f,m,g,_,p){at.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c,h,d,f,m,g,_,p)}set(e,t,n,r,s,o,a,l,c,h,d,f,m,g,_,p){const u=this.elements;return u[0]=e,u[4]=t,u[8]=n,u[12]=r,u[1]=s,u[5]=o,u[9]=a,u[13]=l,u[2]=c,u[6]=h,u[10]=d,u[14]=f,u[3]=m,u[7]=g,u[11]=_,u[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new at().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/$n.setFromMatrixColumn(e,0).length(),s=1/$n.setFromMatrixColumn(e,1).length(),o=1/$n.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=o*h,m=o*d,g=a*h,_=a*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=m+g*c,t[5]=f-_*c,t[9]=-a*l,t[2]=_-f*c,t[6]=g+m*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*h,m=l*d,g=c*h,_=c*d;t[0]=f+_*a,t[4]=g*a-m,t[8]=o*c,t[1]=o*d,t[5]=o*h,t[9]=-a,t[2]=m*a-g,t[6]=_+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*h,m=l*d,g=c*h,_=c*d;t[0]=f-_*a,t[4]=-o*d,t[8]=g+m*a,t[1]=m+g*a,t[5]=o*h,t[9]=_-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*h,m=o*d,g=a*h,_=a*d;t[0]=l*h,t[4]=g*c-m,t[8]=f*c+_,t[1]=l*d,t[5]=_*c+f,t[9]=m*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,m=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=_-f*d,t[8]=g*d+m,t[1]=d,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=m*d+g,t[10]=f-_*d}else if(e.order==="XZY"){const f=o*l,m=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=f*d+_,t[5]=o*h,t[9]=m*d-g,t[2]=g*d-m,t[6]=a*h,t[10]=_*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Qc,e,eh)}lookAt(e,t,n){const r=this.elements;return Ut.subVectors(e,t),Ut.lengthSq()===0&&(Ut.z=1),Ut.normalize(),gn.crossVectors(n,Ut),gn.lengthSq()===0&&(Math.abs(n.z)===1?Ut.x+=1e-4:Ut.z+=1e-4,Ut.normalize(),gn.crossVectors(n,Ut)),gn.normalize(),$i.crossVectors(Ut,gn),r[0]=gn.x,r[4]=$i.x,r[8]=Ut.x,r[1]=gn.y,r[5]=$i.y,r[9]=Ut.y,r[2]=gn.z,r[6]=$i.z,r[10]=Ut.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],f=n[9],m=n[13],g=n[2],_=n[6],p=n[10],u=n[14],T=n[3],M=n[7],b=n[11],P=n[15],A=r[0],w=r[4],q=r[8],x=r[12],y=r[1],V=r[5],X=r[9],ne=r[13],L=r[2],G=r[6],W=r[10],K=r[14],Y=r[3],Z=r[7],j=r[11],ie=r[15];return s[0]=o*A+a*y+l*L+c*Y,s[4]=o*w+a*V+l*G+c*Z,s[8]=o*q+a*X+l*W+c*j,s[12]=o*x+a*ne+l*K+c*ie,s[1]=h*A+d*y+f*L+m*Y,s[5]=h*w+d*V+f*G+m*Z,s[9]=h*q+d*X+f*W+m*j,s[13]=h*x+d*ne+f*K+m*ie,s[2]=g*A+_*y+p*L+u*Y,s[6]=g*w+_*V+p*G+u*Z,s[10]=g*q+_*X+p*W+u*j,s[14]=g*x+_*ne+p*K+u*ie,s[3]=T*A+M*y+b*L+P*Y,s[7]=T*w+M*V+b*G+P*Z,s[11]=T*q+M*X+b*W+P*j,s[15]=T*x+M*ne+b*K+P*ie,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],d=e[6],f=e[10],m=e[14],g=e[3],_=e[7],p=e[11],u=e[15];return g*(+s*l*d-r*c*d-s*a*f+n*c*f+r*a*m-n*l*m)+_*(+t*l*m-t*c*f+s*o*f-r*o*m+r*c*h-s*l*h)+p*(+t*c*d-t*a*m-s*o*d+n*o*m+s*a*h-n*c*h)+u*(-r*a*h-t*l*d+t*a*f+r*o*d-n*o*f+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=e[9],f=e[10],m=e[11],g=e[12],_=e[13],p=e[14],u=e[15],T=d*p*c-_*f*c+_*l*m-a*p*m-d*l*u+a*f*u,M=g*f*c-h*p*c-g*l*m+o*p*m+h*l*u-o*f*u,b=h*_*c-g*d*c+g*a*m-o*_*m-h*a*u+o*d*u,P=g*d*l-h*_*l-g*a*f+o*_*f+h*a*p-o*d*p,A=t*T+n*M+r*b+s*P;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/A;return e[0]=T*w,e[1]=(_*f*s-d*p*s-_*r*m+n*p*m+d*r*u-n*f*u)*w,e[2]=(a*p*s-_*l*s+_*r*c-n*p*c-a*r*u+n*l*u)*w,e[3]=(d*l*s-a*f*s-d*r*c+n*f*c+a*r*m-n*l*m)*w,e[4]=M*w,e[5]=(h*p*s-g*f*s+g*r*m-t*p*m-h*r*u+t*f*u)*w,e[6]=(g*l*s-o*p*s-g*r*c+t*p*c+o*r*u-t*l*u)*w,e[7]=(o*f*s-h*l*s+h*r*c-t*f*c-o*r*m+t*l*m)*w,e[8]=b*w,e[9]=(g*d*s-h*_*s-g*n*m+t*_*m+h*n*u-t*d*u)*w,e[10]=(o*_*s-g*a*s+g*n*c-t*_*c-o*n*u+t*a*u)*w,e[11]=(h*a*s-o*d*s-h*n*c+t*d*c+o*n*m-t*a*m)*w,e[12]=P*w,e[13]=(h*_*r-g*d*r+g*n*f-t*_*f-h*n*p+t*d*p)*w,e[14]=(g*a*r-o*_*r-g*n*l+t*_*l+o*n*p-t*a*p)*w,e[15]=(o*d*r-h*a*r+h*n*l-t*d*l-o*n*f+t*a*f)*w,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-r*l,c*l+r*a,0,c*a+r*l,h*a+n,h*l-r*o,0,c*l-r*a,h*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,h=o+o,d=a+a,f=s*c,m=s*h,g=s*d,_=o*h,p=o*d,u=a*d,T=l*c,M=l*h,b=l*d,P=n.x,A=n.y,w=n.z;return r[0]=(1-(_+u))*P,r[1]=(m+b)*P,r[2]=(g-M)*P,r[3]=0,r[4]=(m-b)*A,r[5]=(1-(f+u))*A,r[6]=(p+T)*A,r[7]=0,r[8]=(g+M)*w,r[9]=(p-T)*w,r[10]=(1-(f+_))*w,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=$n.set(r[0],r[1],r[2]).length();const o=$n.set(r[4],r[5],r[6]).length(),a=$n.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Xt.copy(this);const c=1/s,h=1/o,d=1/a;return Xt.elements[0]*=c,Xt.elements[1]*=c,Xt.elements[2]*=c,Xt.elements[4]*=h,Xt.elements[5]*=h,Xt.elements[6]*=h,Xt.elements[8]*=d,Xt.elements[9]*=d,Xt.elements[10]*=d,t.setFromRotationMatrix(Xt),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=cn){const l=this.elements,c=2*s/(t-e),h=2*s/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r);let m,g;if(a===cn)m=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Cr)m=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=cn){const l=this.elements,c=1/(t-e),h=1/(n-r),d=1/(o-s),f=(t+e)*c,m=(n+r)*h;let g,_;if(a===cn)g=(o+s)*d,_=-2*d;else if(a===Cr)g=s*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const $n=new R,Xt=new at,Qc=new R(0,0,0),eh=new R(1,1,1),gn=new R,$i=new R,Ut=new R,Ha=new at,Va=new wn;class Tn{constructor(e=0,t=0,n=0,r=Tn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],h=r[9],d=r[2],f=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(At(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-At(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(At(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-At(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(At(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-At(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ha.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ha,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Va.setFromEuler(this),this.setFromQuaternion(Va,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Tn.DEFAULT_ORDER="XYZ";class Qo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let th=0;const ka=new R,Jn=new wn,rn=new at,Ji=new R,Ai=new R,nh=new R,ih=new wn,Wa=new R(1,0,0),Xa=new R(0,1,0),qa=new R(0,0,1),rh={type:"added"},sh={type:"removed"};class xt extends Ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:th++}),this.uuid=un(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xt.DEFAULT_UP.clone();const e=new R,t=new Tn,n=new wn,r=new R(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new at},normalMatrix:{value:new He}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=xt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Jn.setFromAxisAngle(e,t),this.quaternion.multiply(Jn),this}rotateOnWorldAxis(e,t){return Jn.setFromAxisAngle(e,t),this.quaternion.premultiply(Jn),this}rotateX(e){return this.rotateOnAxis(Wa,e)}rotateY(e){return this.rotateOnAxis(Xa,e)}rotateZ(e){return this.rotateOnAxis(qa,e)}translateOnAxis(e,t){return ka.copy(e).applyQuaternion(this.quaternion),this.position.add(ka.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Wa,e)}translateY(e){return this.translateOnAxis(Xa,e)}translateZ(e){return this.translateOnAxis(qa,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(rn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ji.copy(e):Ji.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ai.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?rn.lookAt(Ai,Ji,this.up):rn.lookAt(Ji,Ai,this.up),this.quaternion.setFromRotationMatrix(rn),r&&(rn.extractRotation(r.matrixWorld),Jn.setFromRotationMatrix(rn),this.quaternion.premultiply(Jn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(rh)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(sh)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),rn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),rn.multiply(e.parent.matrixWorld)),e.applyMatrix4(rn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ai,e,nh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ai,ih,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),d=o(e.shapes),f=o(e.skeletons),m=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}xt.DEFAULT_UP=new R(0,1,0);xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const qt=new R,sn=new R,is=new R,an=new R,Qn=new R,ei=new R,Ya=new R,rs=new R,ss=new R,as=new R;let Qi=!1;class Ft{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),qt.subVectors(e,t),r.cross(qt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){qt.subVectors(r,t),sn.subVectors(n,t),is.subVectors(e,t);const o=qt.dot(qt),a=qt.dot(sn),l=qt.dot(is),c=sn.dot(sn),h=sn.dot(is),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const f=1/d,m=(c*l-a*h)*f,g=(o*h-a*l)*f;return s.set(1-m-g,g,m)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,an)===null?!1:an.x>=0&&an.y>=0&&an.x+an.y<=1}static getUV(e,t,n,r,s,o,a,l){return Qi===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Qi=!0),this.getInterpolation(e,t,n,r,s,o,a,l)}static getInterpolation(e,t,n,r,s,o,a,l){return this.getBarycoord(e,t,n,r,an)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,an.x),l.addScaledVector(o,an.y),l.addScaledVector(a,an.z),l)}static isFrontFacing(e,t,n,r){return qt.subVectors(n,t),sn.subVectors(e,t),qt.cross(sn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return qt.subVectors(this.c,this.b),sn.subVectors(this.a,this.b),qt.cross(sn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ft.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ft.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,r,s){return Qi===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Qi=!0),Ft.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}getInterpolation(e,t,n,r,s){return Ft.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Ft.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ft.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let o,a;Qn.subVectors(r,n),ei.subVectors(s,n),rs.subVectors(e,n);const l=Qn.dot(rs),c=ei.dot(rs);if(l<=0&&c<=0)return t.copy(n);ss.subVectors(e,r);const h=Qn.dot(ss),d=ei.dot(ss);if(h>=0&&d<=h)return t.copy(r);const f=l*d-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(Qn,o);as.subVectors(e,s);const m=Qn.dot(as),g=ei.dot(as);if(g>=0&&m<=g)return t.copy(s);const _=m*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(ei,a);const p=h*g-m*d;if(p<=0&&d-h>=0&&m-g>=0)return Ya.subVectors(s,r),a=(d-h)/(d-h+(m-g)),t.copy(r).addScaledVector(Ya,a);const u=1/(p+_+f);return o=_*u,a=f*u,t.copy(n).addScaledVector(Qn,o).addScaledVector(ei,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const el={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_n={h:0,s:0,l:0},er={h:0,s:0,l:0};function os(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ke{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=pt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ze.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Ze.workingColorSpace){if(e=ks(e,1),t=At(t,0,1),n=At(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=os(o,s,e+1/3),this.g=os(o,s,e),this.b=os(o,s,e-1/3)}return Ze.toWorkingColorSpace(this,r),this}setStyle(e,t=pt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=pt){const n=el[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=gi(e.r),this.g=gi(e.g),this.b=gi(e.b),this}copyLinearToSRGB(e){return this.r=Kr(e.r),this.g=Kr(e.g),this.b=Kr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=pt){return Ze.fromWorkingColorSpace(vt.copy(this),e),Math.round(At(vt.r*255,0,255))*65536+Math.round(At(vt.g*255,0,255))*256+Math.round(At(vt.b*255,0,255))}getHexString(e=pt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.fromWorkingColorSpace(vt.copy(this),t);const n=vt.r,r=vt.g,s=vt.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-n)/d+2;break;case s:l=(n-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ze.workingColorSpace){return Ze.fromWorkingColorSpace(vt.copy(this),t),e.r=vt.r,e.g=vt.g,e.b=vt.b,e}getStyle(e=pt){Ze.fromWorkingColorSpace(vt.copy(this),e);const t=vt.r,n=vt.g,r=vt.b;return e!==pt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(_n),this.setHSL(_n.h+e,_n.s+t,_n.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(_n),e.getHSL(er);const n=Di(_n.h,er.h,t),r=Di(_n.s,er.s,t),s=Di(_n.l,er.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const vt=new ke;ke.NAMES=el;let ah=0;class Kt extends Ei{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ah++}),this.uuid=un(),this.name="",this.type="Material",this.blending=pi,this.side=bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Es,this.blendDst=ys,this.blendEquation=Fn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ke(0,0,0),this.blendAlpha=0,this.depthFunc=br,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ia,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qn,this.stencilZFail=qn,this.stencilZPass=qn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==pi&&(n.blending=this.blending),this.side!==bn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Es&&(n.blendSrc=this.blendSrc),this.blendDst!==ys&&(n.blendDst=this.blendDst),this.blendEquation!==Fn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==br&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ia&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==qn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==qn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==qn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class kn extends Kt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Bo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ot=new R,tr=new Se;class Vt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Rs,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Sn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)tr.fromBufferAttribute(this,t),tr.applyMatrix3(e),this.setXY(t,tr.x,tr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ot.fromBufferAttribute(this,t),ot.applyMatrix3(e),this.setXYZ(t,ot.x,ot.y,ot.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ot.fromBufferAttribute(this,t),ot.applyMatrix4(e),this.setXYZ(t,ot.x,ot.y,ot.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ot.fromBufferAttribute(this,t),ot.applyNormalMatrix(e),this.setXYZ(t,ot.x,ot.y,ot.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ot.fromBufferAttribute(this,t),ot.transformDirection(e),this.setXYZ(t,ot.x,ot.y,ot.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Qt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ye(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Qt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ye(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Qt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ye(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Qt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ye(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Qt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ye(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array),r=Ye(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array),r=Ye(r,this.array),s=Ye(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Rs&&(e.usage=this.usage),e}}class tl extends Vt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class nl extends Vt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class rt extends Vt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let oh=0;const Ot=new at,ls=new xt,ti=new R,It=new Xn,Ri=new Xn,ft=new R;class lt extends Ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:oh++}),this.uuid=un(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ko(e)?nl:tl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new He().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ot.makeRotationFromQuaternion(e),this.applyMatrix4(Ot),this}rotateX(e){return Ot.makeRotationX(e),this.applyMatrix4(Ot),this}rotateY(e){return Ot.makeRotationY(e),this.applyMatrix4(Ot),this}rotateZ(e){return Ot.makeRotationZ(e),this.applyMatrix4(Ot),this}translate(e,t,n){return Ot.makeTranslation(e,t,n),this.applyMatrix4(Ot),this}scale(e,t,n){return Ot.makeScale(e,t,n),this.applyMatrix4(Ot),this}lookAt(e){return ls.lookAt(e),ls.updateMatrix(),this.applyMatrix4(ls.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ti).negate(),this.translate(ti.x,ti.y,ti.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new rt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];It.setFromBufferAttribute(s),this.morphTargetsRelative?(ft.addVectors(this.boundingBox.min,It.min),this.boundingBox.expandByPoint(ft),ft.addVectors(this.boundingBox.max,It.max),this.boundingBox.expandByPoint(ft)):(this.boundingBox.expandByPoint(It.min),this.boundingBox.expandByPoint(It.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(It.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Ri.setFromBufferAttribute(a),this.morphTargetsRelative?(ft.addVectors(It.min,Ri.min),It.expandByPoint(ft),ft.addVectors(It.max,Ri.max),It.expandByPoint(ft)):(It.expandByPoint(Ri.min),It.expandByPoint(Ri.max))}It.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)ft.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(ft));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)ft.fromBufferAttribute(a,c),l&&(ti.fromBufferAttribute(e,c),ft.add(ti)),r=Math.max(r,n.distanceToSquared(ft))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,r=t.position.array,s=t.normal.array,o=t.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Vt(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let y=0;y<a;y++)c[y]=new R,h[y]=new R;const d=new R,f=new R,m=new R,g=new Se,_=new Se,p=new Se,u=new R,T=new R;function M(y,V,X){d.fromArray(r,y*3),f.fromArray(r,V*3),m.fromArray(r,X*3),g.fromArray(o,y*2),_.fromArray(o,V*2),p.fromArray(o,X*2),f.sub(d),m.sub(d),_.sub(g),p.sub(g);const ne=1/(_.x*p.y-p.x*_.y);isFinite(ne)&&(u.copy(f).multiplyScalar(p.y).addScaledVector(m,-_.y).multiplyScalar(ne),T.copy(m).multiplyScalar(_.x).addScaledVector(f,-p.x).multiplyScalar(ne),c[y].add(u),c[V].add(u),c[X].add(u),h[y].add(T),h[V].add(T),h[X].add(T))}let b=this.groups;b.length===0&&(b=[{start:0,count:n.length}]);for(let y=0,V=b.length;y<V;++y){const X=b[y],ne=X.start,L=X.count;for(let G=ne,W=ne+L;G<W;G+=3)M(n[G+0],n[G+1],n[G+2])}const P=new R,A=new R,w=new R,q=new R;function x(y){w.fromArray(s,y*3),q.copy(w);const V=c[y];P.copy(V),P.sub(w.multiplyScalar(w.dot(V))).normalize(),A.crossVectors(q,V);const ne=A.dot(h[y])<0?-1:1;l[y*4]=P.x,l[y*4+1]=P.y,l[y*4+2]=P.z,l[y*4+3]=ne}for(let y=0,V=b.length;y<V;++y){const X=b[y],ne=X.start,L=X.count;for(let G=ne,W=ne+L;G<W;G+=3)x(n[G+0]),x(n[G+1]),x(n[G+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Vt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);const r=new R,s=new R,o=new R,a=new R,l=new R,c=new R,h=new R,d=new R;if(e)for(let f=0,m=e.count;f<m;f+=3){const g=e.getX(f+0),_=e.getX(f+1),p=e.getX(f+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,p),h.subVectors(o,s),d.subVectors(r,s),h.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,m=t.count;f<m;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,s),d.subVectors(r,s),h.cross(d),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)ft.fromBufferAttribute(e,t),ft.normalize(),e.setXYZ(t,ft.x,ft.y,ft.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,d=a.normalized,f=new c.constructor(l.length*h);let m=0,g=0;for(let _=0,p=l.length;_<p;_++){a.isInterleavedBufferAttribute?m=l[_]*a.data.stride+a.offset:m=l[_]*h;for(let u=0;u<h;u++)f[g++]=c[m++]}return new Vt(f,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new lt,n=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,d=c.length;h<d;h++){const f=c[h],m=e(f,n);l.push(m)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,f=c.length;d<f;d++){const m=c[d];h.push(m.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],d=s[c];for(let f=0,m=d.length;f<m;f++)h.push(d[f].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Za=new at,Ln=new Ws,nr=new Gi,Ka=new R,ni=new R,ii=new R,ri=new R,cs=new R,ir=new R,rr=new Se,sr=new Se,ar=new Se,ja=new R,$a=new R,Ja=new R,or=new R,lr=new R;class Qe extends xt{constructor(e=new lt,t=new kn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){ir.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],d=s[l];h!==0&&(cs.fromBufferAttribute(d,e),o?ir.addScaledVector(cs,h):ir.addScaledVector(cs.sub(t),h))}t.add(ir)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),nr.copy(n.boundingSphere),nr.applyMatrix4(s),Ln.copy(e.ray).recast(e.near),!(nr.containsPoint(Ln.origin)===!1&&(Ln.intersectSphere(nr,Ka)===null||Ln.origin.distanceToSquared(Ka)>(e.far-e.near)**2))&&(Za.copy(s).invert(),Ln.copy(e.ray).applyMatrix4(Za),!(n.boundingBox!==null&&Ln.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ln)))}_computeIntersections(e,t,n){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,f=s.groups,m=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const p=f[g],u=o[p.materialIndex],T=Math.max(p.start,m.start),M=Math.min(a.count,Math.min(p.start+p.count,m.start+m.count));for(let b=T,P=M;b<P;b+=3){const A=a.getX(b),w=a.getX(b+1),q=a.getX(b+2);r=cr(this,u,e,n,c,h,d,A,w,q),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),_=Math.min(a.count,m.start+m.count);for(let p=g,u=_;p<u;p+=3){const T=a.getX(p),M=a.getX(p+1),b=a.getX(p+2);r=cr(this,o,e,n,c,h,d,T,M,b),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const p=f[g],u=o[p.materialIndex],T=Math.max(p.start,m.start),M=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let b=T,P=M;b<P;b+=3){const A=b,w=b+1,q=b+2;r=cr(this,u,e,n,c,h,d,A,w,q),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let p=g,u=_;p<u;p+=3){const T=p,M=p+1,b=p+2;r=cr(this,o,e,n,c,h,d,T,M,b),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function lh(i,e,t,n,r,s,o,a){let l;if(e.side===Pt?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,e.side===bn,a),l===null)return null;lr.copy(a),lr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(lr);return c<t.near||c>t.far?null:{distance:c,point:lr.clone(),object:i}}function cr(i,e,t,n,r,s,o,a,l,c){i.getVertexPosition(a,ni),i.getVertexPosition(l,ii),i.getVertexPosition(c,ri);const h=lh(i,e,t,n,ni,ii,ri,or);if(h){r&&(rr.fromBufferAttribute(r,a),sr.fromBufferAttribute(r,l),ar.fromBufferAttribute(r,c),h.uv=Ft.getInterpolation(or,ni,ii,ri,rr,sr,ar,new Se)),s&&(rr.fromBufferAttribute(s,a),sr.fromBufferAttribute(s,l),ar.fromBufferAttribute(s,c),h.uv1=Ft.getInterpolation(or,ni,ii,ri,rr,sr,ar,new Se),h.uv2=h.uv1),o&&(ja.fromBufferAttribute(o,a),$a.fromBufferAttribute(o,l),Ja.fromBufferAttribute(o,c),h.normal=Ft.getInterpolation(or,ni,ii,ri,ja,$a,Ja,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new R,materialIndex:0};Ft.getNormal(ni,ii,ri,d.normal),h.face=d}return h}class kt extends lt{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],d=[];let f=0,m=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,r,o,2),g("x","z","y",1,-1,e,n,-t,r,o,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new rt(c,3)),this.setAttribute("normal",new rt(h,3)),this.setAttribute("uv",new rt(d,2));function g(_,p,u,T,M,b,P,A,w,q,x){const y=b/w,V=P/q,X=b/2,ne=P/2,L=A/2,G=w+1,W=q+1;let K=0,Y=0;const Z=new R;for(let j=0;j<W;j++){const ie=j*V-ne;for(let re=0;re<G;re++){const k=re*y-X;Z[_]=k*T,Z[p]=ie*M,Z[u]=L,c.push(Z.x,Z.y,Z.z),Z[_]=0,Z[p]=0,Z[u]=A>0?1:-1,h.push(Z.x,Z.y,Z.z),d.push(re/w),d.push(1-j/q),K+=1}}for(let j=0;j<q;j++)for(let ie=0;ie<w;ie++){const re=f+ie+G*j,k=f+ie+G*(j+1),$=f+(ie+1)+G*(j+1),he=f+(ie+1)+G*j;l.push(re,k,he),l.push(k,$,he),Y+=6}a.addGroup(m,Y,x),m+=Y,f+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Mi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Tt(i){const e={};for(let t=0;t<i.length;t++){const n=Mi(i[t]);for(const r in n)e[r]=n[r]}return e}function ch(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function il(i){return i.getRenderTarget()===null?i.outputColorSpace:Ze.workingColorSpace}const hh={clone:Mi,merge:Tt};var uh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,dh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Wn extends Kt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=uh,this.fragmentShader=dh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Mi(e.uniforms),this.uniformsGroups=ch(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class rl extends xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=cn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class zt extends rl{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Oi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(mi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Oi*2*Math.atan(Math.tan(mi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(mi*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*n/c,r*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const si=-90,ai=1;class fh extends xt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new zt(si,ai,e,t);r.layers=this.layers,this.add(r);const s=new zt(si,ai,e,t);s.layers=this.layers,this.add(s);const o=new zt(si,ai,e,t);o.layers=this.layers,this.add(o);const a=new zt(si,ai,e,t);a.layers=this.layers,this.add(a);const l=new zt(si,ai,e,t);l.layers=this.layers,this.add(l);const c=new zt(si,ai,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===cn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Cr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),e.render(t,h),e.setRenderTarget(d,f,m),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class sl extends Lt{constructor(e,t,n,r,s,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:vi,super(e,t,n,r,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ph extends Vn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];t.encoding!==void 0&&(Ui("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Hn?pt:Gt),this.texture=new sl(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Bt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new kt(5,5,5),s=new Wn({name:"CubemapFromEquirect",uniforms:Mi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pt,blending:Mn});s.uniforms.tEquirect.value=t;const o=new Qe(r,s),a=t.minFilter;return t.minFilter===Fi&&(t.minFilter=Bt),new fh(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}}const hs=new R,mh=new R,gh=new He;class Un{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=hs.subVectors(n,t).cross(mh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(hs),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||gh.getNormalMatrix(e),r=this.coplanarPoint(hs).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Dn=new Gi,hr=new R;class al{constructor(e=new Un,t=new Un,n=new Un,r=new Un,s=new Un,o=new Un){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=cn){const n=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],h=r[5],d=r[6],f=r[7],m=r[8],g=r[9],_=r[10],p=r[11],u=r[12],T=r[13],M=r[14],b=r[15];if(n[0].setComponents(l-s,f-c,p-m,b-u).normalize(),n[1].setComponents(l+s,f+c,p+m,b+u).normalize(),n[2].setComponents(l+o,f+h,p+g,b+T).normalize(),n[3].setComponents(l-o,f-h,p-g,b-T).normalize(),n[4].setComponents(l-a,f-d,p-_,b-M).normalize(),t===cn)n[5].setComponents(l+a,f+d,p+_,b+M).normalize();else if(t===Cr)n[5].setComponents(a,d,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Dn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Dn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Dn)}intersectsSprite(e){return Dn.center.set(0,0,0),Dn.radius=.7071067811865476,Dn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Dn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(hr.x=r.normal.x>0?e.max.x:e.min.x,hr.y=r.normal.y>0?e.max.y:e.min.y,hr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(hr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ol(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function _h(i,e){const t=e.isWebGL2,n=new WeakMap;function r(c,h){const d=c.array,f=c.usage,m=d.byteLength,g=i.createBuffer();i.bindBuffer(h,g),i.bufferData(h,d,f),c.onUploadCallback();let _;if(d instanceof Float32Array)_=i.FLOAT;else if(d instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(d instanceof Int16Array)_=i.SHORT;else if(d instanceof Uint32Array)_=i.UNSIGNED_INT;else if(d instanceof Int32Array)_=i.INT;else if(d instanceof Int8Array)_=i.BYTE;else if(d instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:_,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:m}}function s(c,h,d){const f=h.array,m=h._updateRange,g=h.updateRanges;if(i.bindBuffer(d,c),m.count===-1&&g.length===0&&i.bufferSubData(d,0,f),g.length!==0){for(let _=0,p=g.length;_<p;_++){const u=g[_];t?i.bufferSubData(d,u.start*f.BYTES_PER_ELEMENT,f,u.start,u.count):i.bufferSubData(d,u.start*f.BYTES_PER_ELEMENT,f.subarray(u.start,u.start+u.count))}h.clearUpdateRanges()}m.count!==-1&&(t?i.bufferSubData(d,m.offset*f.BYTES_PER_ELEMENT,f,m.offset,m.count):i.bufferSubData(d,m.offset*f.BYTES_PER_ELEMENT,f.subarray(m.offset,m.offset+m.count)),m.count=-1),h.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(i.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=n.get(c);if(d===void 0)n.set(c,r(c,h));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(d.buffer,c,h),d.version=c.version}}return{get:o,remove:a,update:l}}class Hi extends lt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(r),c=a+1,h=l+1,d=e/a,f=t/l,m=[],g=[],_=[],p=[];for(let u=0;u<h;u++){const T=u*f-o;for(let M=0;M<c;M++){const b=M*d-s;g.push(b,-T,0),_.push(0,0,1),p.push(M/a),p.push(1-u/l)}}for(let u=0;u<l;u++)for(let T=0;T<a;T++){const M=T+c*u,b=T+c*(u+1),P=T+1+c*(u+1),A=T+1+c*u;m.push(M,b,A),m.push(b,P,A)}this.setIndex(m),this.setAttribute("position",new rt(g,3)),this.setAttribute("normal",new rt(_,3)),this.setAttribute("uv",new rt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hi(e.width,e.height,e.widthSegments,e.heightSegments)}}var vh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Sh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Mh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Eh=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,yh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Th=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,bh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,wh=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ah=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Rh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ch=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ph=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Lh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Dh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Uh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Ih=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Fh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Nh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Oh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Bh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,zh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Gh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Hh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Vh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,kh=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Wh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Xh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Yh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Zh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Kh=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,jh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,$h=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Jh=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Qh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,eu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,tu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,nu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,iu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ru=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,su=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,au=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,ou=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,cu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,hu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,uu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,du=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,fu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,pu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,mu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,gu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,_u=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,vu=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,xu=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Su=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Mu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Eu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yu=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Tu=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,bu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,wu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Au=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ru=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Cu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Pu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Lu=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Du=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Uu=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Iu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Fu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Nu=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ou=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Gu=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Hu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ku=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Wu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Xu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qu=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Yu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Zu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ku=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ju=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$u=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ju=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qu=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,ed=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,td=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,nd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,id=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,rd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,sd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ad=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,od=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ld=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,cd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ud=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,dd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,fd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,pd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,md=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,gd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _d=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,vd=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sd=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Md=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ed=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Td=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,bd=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,wd=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Ad=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Rd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cd=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Pd=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ld=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Dd=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ud=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Id=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fd=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Nd=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Od=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Bd=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,zd=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gd=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hd=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Vd=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kd=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wd=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xd=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,qd=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Yd=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zd=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Kd=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,jd=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Fe={alphahash_fragment:vh,alphahash_pars_fragment:xh,alphamap_fragment:Sh,alphamap_pars_fragment:Mh,alphatest_fragment:Eh,alphatest_pars_fragment:yh,aomap_fragment:Th,aomap_pars_fragment:bh,batching_pars_vertex:wh,batching_vertex:Ah,begin_vertex:Rh,beginnormal_vertex:Ch,bsdfs:Ph,iridescence_fragment:Lh,bumpmap_pars_fragment:Dh,clipping_planes_fragment:Uh,clipping_planes_pars_fragment:Ih,clipping_planes_pars_vertex:Fh,clipping_planes_vertex:Nh,color_fragment:Oh,color_pars_fragment:Bh,color_pars_vertex:zh,color_vertex:Gh,common:Hh,cube_uv_reflection_fragment:Vh,defaultnormal_vertex:kh,displacementmap_pars_vertex:Wh,displacementmap_vertex:Xh,emissivemap_fragment:qh,emissivemap_pars_fragment:Yh,colorspace_fragment:Zh,colorspace_pars_fragment:Kh,envmap_fragment:jh,envmap_common_pars_fragment:$h,envmap_pars_fragment:Jh,envmap_pars_vertex:Qh,envmap_physical_pars_fragment:uu,envmap_vertex:eu,fog_vertex:tu,fog_pars_vertex:nu,fog_fragment:iu,fog_pars_fragment:ru,gradientmap_pars_fragment:su,lightmap_fragment:au,lightmap_pars_fragment:ou,lights_lambert_fragment:lu,lights_lambert_pars_fragment:cu,lights_pars_begin:hu,lights_toon_fragment:du,lights_toon_pars_fragment:fu,lights_phong_fragment:pu,lights_phong_pars_fragment:mu,lights_physical_fragment:gu,lights_physical_pars_fragment:_u,lights_fragment_begin:vu,lights_fragment_maps:xu,lights_fragment_end:Su,logdepthbuf_fragment:Mu,logdepthbuf_pars_fragment:Eu,logdepthbuf_pars_vertex:yu,logdepthbuf_vertex:Tu,map_fragment:bu,map_pars_fragment:wu,map_particle_fragment:Au,map_particle_pars_fragment:Ru,metalnessmap_fragment:Cu,metalnessmap_pars_fragment:Pu,morphcolor_vertex:Lu,morphnormal_vertex:Du,morphtarget_pars_vertex:Uu,morphtarget_vertex:Iu,normal_fragment_begin:Fu,normal_fragment_maps:Nu,normal_pars_fragment:Ou,normal_pars_vertex:Bu,normal_vertex:zu,normalmap_pars_fragment:Gu,clearcoat_normal_fragment_begin:Hu,clearcoat_normal_fragment_maps:Vu,clearcoat_pars_fragment:ku,iridescence_pars_fragment:Wu,opaque_fragment:Xu,packing:qu,premultiplied_alpha_fragment:Yu,project_vertex:Zu,dithering_fragment:Ku,dithering_pars_fragment:ju,roughnessmap_fragment:$u,roughnessmap_pars_fragment:Ju,shadowmap_pars_fragment:Qu,shadowmap_pars_vertex:ed,shadowmap_vertex:td,shadowmask_pars_fragment:nd,skinbase_vertex:id,skinning_pars_vertex:rd,skinning_vertex:sd,skinnormal_vertex:ad,specularmap_fragment:od,specularmap_pars_fragment:ld,tonemapping_fragment:cd,tonemapping_pars_fragment:hd,transmission_fragment:ud,transmission_pars_fragment:dd,uv_pars_fragment:fd,uv_pars_vertex:pd,uv_vertex:md,worldpos_vertex:gd,background_vert:_d,background_frag:vd,backgroundCube_vert:xd,backgroundCube_frag:Sd,cube_vert:Md,cube_frag:Ed,depth_vert:yd,depth_frag:Td,distanceRGBA_vert:bd,distanceRGBA_frag:wd,equirect_vert:Ad,equirect_frag:Rd,linedashed_vert:Cd,linedashed_frag:Pd,meshbasic_vert:Ld,meshbasic_frag:Dd,meshlambert_vert:Ud,meshlambert_frag:Id,meshmatcap_vert:Fd,meshmatcap_frag:Nd,meshnormal_vert:Od,meshnormal_frag:Bd,meshphong_vert:zd,meshphong_frag:Gd,meshphysical_vert:Hd,meshphysical_frag:Vd,meshtoon_vert:kd,meshtoon_frag:Wd,points_vert:Xd,points_frag:qd,shadow_vert:Yd,shadow_frag:Zd,sprite_vert:Kd,sprite_frag:jd},ae={common:{diffuse:{value:new ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new Se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new ke(16777215)},opacity:{value:1},center:{value:new Se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},Jt={basic:{uniforms:Tt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:Tt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new ke(0)}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:Tt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new ke(0)},specular:{value:new ke(1118481)},shininess:{value:30}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:Tt([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:Tt([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new ke(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:Tt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:Tt([ae.points,ae.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:Tt([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:Tt([ae.common,ae.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:Tt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:Tt([ae.sprite,ae.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distanceRGBA:{uniforms:Tt([ae.common,ae.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distanceRGBA_vert,fragmentShader:Fe.distanceRGBA_frag},shadow:{uniforms:Tt([ae.lights,ae.fog,{color:{value:new ke(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};Jt.physical={uniforms:Tt([Jt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new Se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new Se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new ke(0)},specularColor:{value:new ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new Se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};const ur={r:0,b:0,g:0};function $d(i,e,t,n,r,s,o){const a=new ke(0);let l=s===!0?0:1,c,h,d=null,f=0,m=null;function g(p,u){let T=!1,M=u.isScene===!0?u.background:null;M&&M.isTexture&&(M=(u.backgroundBlurriness>0?t:e).get(M)),M===null?_(a,l):M&&M.isColor&&(_(M,1),T=!0);const b=i.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,o):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||T)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),M&&(M.isCubeTexture||M.mapping===Ur)?(h===void 0&&(h=new Qe(new kt(1,1,1),new Wn({name:"BackgroundCubeMaterial",uniforms:Mi(Jt.backgroundCube.uniforms),vertexShader:Jt.backgroundCube.vertexShader,fragmentShader:Jt.backgroundCube.fragmentShader,side:Pt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,A,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=u.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,h.material.toneMapped=Ze.getTransfer(M.colorSpace)!==Je,(d!==M||f!==M.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,d=M,f=M.version,m=i.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Qe(new Hi(2,2),new Wn({name:"BackgroundMaterial",uniforms:Mi(Jt.background.uniforms),vertexShader:Jt.background.vertexShader,fragmentShader:Jt.background.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,c.material.toneMapped=Ze.getTransfer(M.colorSpace)!==Je,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||f!==M.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,d=M,f=M.version,m=i.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function _(p,u){p.getRGB(ur,il(i)),n.buffers.color.setClear(ur.r,ur.g,ur.b,u,o)}return{getClearColor:function(){return a},setClearColor:function(p,u=1){a.set(p),l=u,_(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,_(a,l)},render:g}}function Jd(i,e,t,n){const r=i.getParameter(i.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},l=p(null);let c=l,h=!1;function d(L,G,W,K,Y){let Z=!1;if(o){const j=_(K,W,G);c!==j&&(c=j,m(c.object)),Z=u(L,K,W,Y),Z&&T(L,K,W,Y)}else{const j=G.wireframe===!0;(c.geometry!==K.id||c.program!==W.id||c.wireframe!==j)&&(c.geometry=K.id,c.program=W.id,c.wireframe=j,Z=!0)}Y!==null&&t.update(Y,i.ELEMENT_ARRAY_BUFFER),(Z||h)&&(h=!1,q(L,G,W,K),Y!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function f(){return n.isWebGL2?i.createVertexArray():s.createVertexArrayOES()}function m(L){return n.isWebGL2?i.bindVertexArray(L):s.bindVertexArrayOES(L)}function g(L){return n.isWebGL2?i.deleteVertexArray(L):s.deleteVertexArrayOES(L)}function _(L,G,W){const K=W.wireframe===!0;let Y=a[L.id];Y===void 0&&(Y={},a[L.id]=Y);let Z=Y[G.id];Z===void 0&&(Z={},Y[G.id]=Z);let j=Z[K];return j===void 0&&(j=p(f()),Z[K]=j),j}function p(L){const G=[],W=[],K=[];for(let Y=0;Y<r;Y++)G[Y]=0,W[Y]=0,K[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:W,attributeDivisors:K,object:L,attributes:{},index:null}}function u(L,G,W,K){const Y=c.attributes,Z=G.attributes;let j=0;const ie=W.getAttributes();for(const re in ie)if(ie[re].location>=0){const $=Y[re];let he=Z[re];if(he===void 0&&(re==="instanceMatrix"&&L.instanceMatrix&&(he=L.instanceMatrix),re==="instanceColor"&&L.instanceColor&&(he=L.instanceColor)),$===void 0||$.attribute!==he||he&&$.data!==he.data)return!0;j++}return c.attributesNum!==j||c.index!==K}function T(L,G,W,K){const Y={},Z=G.attributes;let j=0;const ie=W.getAttributes();for(const re in ie)if(ie[re].location>=0){let $=Z[re];$===void 0&&(re==="instanceMatrix"&&L.instanceMatrix&&($=L.instanceMatrix),re==="instanceColor"&&L.instanceColor&&($=L.instanceColor));const he={};he.attribute=$,$&&$.data&&(he.data=$.data),Y[re]=he,j++}c.attributes=Y,c.attributesNum=j,c.index=K}function M(){const L=c.newAttributes;for(let G=0,W=L.length;G<W;G++)L[G]=0}function b(L){P(L,0)}function P(L,G){const W=c.newAttributes,K=c.enabledAttributes,Y=c.attributeDivisors;W[L]=1,K[L]===0&&(i.enableVertexAttribArray(L),K[L]=1),Y[L]!==G&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,G),Y[L]=G)}function A(){const L=c.newAttributes,G=c.enabledAttributes;for(let W=0,K=G.length;W<K;W++)G[W]!==L[W]&&(i.disableVertexAttribArray(W),G[W]=0)}function w(L,G,W,K,Y,Z,j){j===!0?i.vertexAttribIPointer(L,G,W,Y,Z):i.vertexAttribPointer(L,G,W,K,Y,Z)}function q(L,G,W,K){if(n.isWebGL2===!1&&(L.isInstancedMesh||K.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;M();const Y=K.attributes,Z=W.getAttributes(),j=G.defaultAttributeValues;for(const ie in Z){const re=Z[ie];if(re.location>=0){let k=Y[ie];if(k===void 0&&(ie==="instanceMatrix"&&L.instanceMatrix&&(k=L.instanceMatrix),ie==="instanceColor"&&L.instanceColor&&(k=L.instanceColor)),k!==void 0){const $=k.normalized,he=k.itemSize,ve=t.get(k);if(ve===void 0)continue;const _e=ve.buffer,Le=ve.type,Ue=ve.bytesPerElement,be=n.isWebGL2===!0&&(Le===i.INT||Le===i.UNSIGNED_INT||k.gpuType===Go);if(k.isInterleavedBufferAttribute){const We=k.data,N=We.stride,St=k.offset;if(We.isInstancedInterleavedBuffer){for(let Me=0;Me<re.locationSize;Me++)P(re.location+Me,We.meshPerAttribute);L.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=We.meshPerAttribute*We.count)}else for(let Me=0;Me<re.locationSize;Me++)b(re.location+Me);i.bindBuffer(i.ARRAY_BUFFER,_e);for(let Me=0;Me<re.locationSize;Me++)w(re.location+Me,he/re.locationSize,Le,$,N*Ue,(St+he/re.locationSize*Me)*Ue,be)}else{if(k.isInstancedBufferAttribute){for(let We=0;We<re.locationSize;We++)P(re.location+We,k.meshPerAttribute);L.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let We=0;We<re.locationSize;We++)b(re.location+We);i.bindBuffer(i.ARRAY_BUFFER,_e);for(let We=0;We<re.locationSize;We++)w(re.location+We,he/re.locationSize,Le,$,he*Ue,he/re.locationSize*We*Ue,be)}}else if(j!==void 0){const $=j[ie];if($!==void 0)switch($.length){case 2:i.vertexAttrib2fv(re.location,$);break;case 3:i.vertexAttrib3fv(re.location,$);break;case 4:i.vertexAttrib4fv(re.location,$);break;default:i.vertexAttrib1fv(re.location,$)}}}}A()}function x(){X();for(const L in a){const G=a[L];for(const W in G){const K=G[W];for(const Y in K)g(K[Y].object),delete K[Y];delete G[W]}delete a[L]}}function y(L){if(a[L.id]===void 0)return;const G=a[L.id];for(const W in G){const K=G[W];for(const Y in K)g(K[Y].object),delete K[Y];delete G[W]}delete a[L.id]}function V(L){for(const G in a){const W=a[G];if(W[L.id]===void 0)continue;const K=W[L.id];for(const Y in K)g(K[Y].object),delete K[Y];delete W[L.id]}}function X(){ne(),h=!0,c!==l&&(c=l,m(c.object))}function ne(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:X,resetDefaultState:ne,dispose:x,releaseStatesOfGeometry:y,releaseStatesOfProgram:V,initAttributes:M,enableAttribute:b,disableUnusedAttributes:A}}function Qd(i,e,t,n){const r=n.isWebGL2;let s;function o(h){s=h}function a(h,d){i.drawArrays(s,h,d),t.update(d,s,1)}function l(h,d,f){if(f===0)return;let m,g;if(r)m=i,g="drawArraysInstanced";else if(m=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[g](s,h,d,f),t.update(d,s,f)}function c(h,d,f){if(f===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<f;g++)this.render(h[g],d[g]);else{m.multiDrawArraysWEBGL(s,h,0,d,0,f);let g=0;for(let _=0;_<f;_++)g+=d[_];t.update(g,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function ef(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),p=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),u=i.getParameter(i.MAX_VARYING_VECTORS),T=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=f>0,b=o||e.has("OES_texture_float"),P=M&&b,A=o?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:f,maxTextureSize:m,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:p,maxVaryings:u,maxFragmentUniforms:T,vertexTextures:M,floatFragmentTextures:b,floatVertexTextures:P,maxSamples:A}}function tf(i){const e=this;let t=null,n=0,r=!1,s=!1;const o=new Un,a=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const m=d.length!==0||f||n!==0||r;return r=f,n=d.length,m},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=h(d,f,0)},this.setState=function(d,f,m){const g=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,u=i.get(d);if(!r||g===null||g.length===0||s&&!p)s?h(null):c();else{const T=s?0:n,M=T*4;let b=u.clippingState||null;l.value=b,b=h(g,f,M,m);for(let P=0;P!==M;++P)b[P]=t[P];u.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,f,m,g){const _=d!==null?d.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const u=m+_*4,T=f.matrixWorldInverse;a.getNormalMatrix(T),(p===null||p.length<u)&&(p=new Float32Array(u));for(let M=0,b=m;M!==_;++M,b+=4)o.copy(d[M]).applyMatrix4(T,a),o.normal.toArray(p,b),p[b+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function nf(i){let e=new WeakMap;function t(o,a){return a===Ts?o.mapping=vi:a===bs&&(o.mapping=xi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ts||a===bs)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new ph(l.height/2);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class ll extends rl{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const di=4,Qa=[.125,.215,.35,.446,.526,.582],Nn=20,us=new ll,eo=new ke;let ds=null,fs=0,ps=0;const In=(1+Math.sqrt(5))/2,oi=1/In,to=[new R(1,1,1),new R(-1,1,1),new R(1,1,-1),new R(-1,1,-1),new R(0,In,oi),new R(0,In,-oi),new R(oi,0,In),new R(-oi,0,In),new R(In,oi,0),new R(-In,oi,0)];class no{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){ds=this._renderer.getRenderTarget(),fs=this._renderer.getActiveCubeFace(),ps=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=so(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ro(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ds,fs,ps),e.scissorTest=!1,dr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===vi||e.mapping===xi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ds=this._renderer.getRenderTarget(),fs=this._renderer.getActiveCubeFace(),ps=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Bt,minFilter:Bt,generateMipmaps:!1,type:Ni,format:Zt,colorSpace:dn,depthBuffer:!1},r=io(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=io(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=rf(s)),this._blurMaterial=sf(s,e,t)}return r}_compileMaterial(e){const t=new Qe(this._lodPlanes[0],e);this._renderer.compile(t,us)}_sceneToCubeUV(e,t,n,r){const a=new zt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(eo),h.toneMapping=En,h.autoClear=!1;const m=new kn({name:"PMREM.Background",side:Pt,depthWrite:!1,depthTest:!1}),g=new Qe(new kt,m);let _=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,_=!0):(m.color.copy(eo),_=!0);for(let u=0;u<6;u++){const T=u%3;T===0?(a.up.set(0,l[u],0),a.lookAt(c[u],0,0)):T===1?(a.up.set(0,0,l[u]),a.lookAt(0,c[u],0)):(a.up.set(0,l[u],0),a.lookAt(0,0,c[u]));const M=this._cubeSize;dr(r,T*M,u>2?M:0,M,M),h.setRenderTarget(r),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=d,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===vi||e.mapping===xi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=so()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ro());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Qe(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;dr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,us)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=to[(r-1)%to.length];this._blur(e,r-1,r,s,o)}t.autoClear=n}_blur(e,t,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Qe(this._lodPlanes[r],c),f=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Nn-1),_=s/g,p=isFinite(s)?1+Math.floor(h*_):Nn;p>Nn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Nn}`);const u=[];let T=0;for(let w=0;w<Nn;++w){const q=w/_,x=Math.exp(-q*q/2);u.push(x),w===0?T+=x:w<p&&(T+=2*x)}for(let w=0;w<u.length;w++)u[w]=u[w]/T;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=u,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-n;const b=this._sizeLods[r],P=3*b*(r>M-di?r-M+di:0),A=4*(this._cubeSize-b);dr(t,P,A,3*b,2*b),l.setRenderTarget(t),l.render(d,us)}}function rf(i){const e=[],t=[],n=[];let r=i;const s=i-di+1+Qa.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>i-di?l=Qa[o-i+di-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,d=1+c,f=[h,h,d,h,d,d,h,h,d,d,h,d],m=6,g=6,_=3,p=2,u=1,T=new Float32Array(_*g*m),M=new Float32Array(p*g*m),b=new Float32Array(u*g*m);for(let A=0;A<m;A++){const w=A%3*2/3-1,q=A>2?0:-1,x=[w,q,0,w+2/3,q,0,w+2/3,q+1,0,w,q,0,w+2/3,q+1,0,w,q+1,0];T.set(x,_*g*A),M.set(f,p*g*A);const y=[A,A,A,A,A,A];b.set(y,u*g*A)}const P=new lt;P.setAttribute("position",new Vt(T,_)),P.setAttribute("uv",new Vt(M,p)),P.setAttribute("faceIndex",new Vt(b,u)),e.push(P),r>di&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function io(i,e,t){const n=new Vn(i,e,t);return n.texture.mapping=Ur,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function dr(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function sf(i,e,t){const n=new Float32Array(Nn),r=new R(0,1,0);return new Wn({name:"SphericalGaussianBlur",defines:{n:Nn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Xs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function ro(){return new Wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function so(){return new Wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function Xs(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function af(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ts||l===bs,h=l===vi||l===xi;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let d=e.get(a);return t===null&&(t=new no(i)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),e.set(a,d),d.texture}else{if(e.has(a))return e.get(a).texture;{const d=a.image;if(c&&d&&d.height>0||h&&d&&r(d)){t===null&&(t=new no(i));const f=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,f),a.addEventListener("dispose",s),f.texture}else return null}}}return a}function r(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function of(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function lf(i,e,t,n){const r={},s=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let p=0,u=_.length;p<u;p++)e.remove(_[p])}f.removeEventListener("dispose",o),delete r[f.id];const m=s.get(f);m&&(e.remove(m),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const g in f)e.update(f[g],i.ARRAY_BUFFER);const m=d.morphAttributes;for(const g in m){const _=m[g];for(let p=0,u=_.length;p<u;p++)e.update(_[p],i.ARRAY_BUFFER)}}function c(d){const f=[],m=d.index,g=d.attributes.position;let _=0;if(m!==null){const T=m.array;_=m.version;for(let M=0,b=T.length;M<b;M+=3){const P=T[M+0],A=T[M+1],w=T[M+2];f.push(P,A,A,w,w,P)}}else if(g!==void 0){const T=g.array;_=g.version;for(let M=0,b=T.length/3-1;M<b;M+=3){const P=M+0,A=M+1,w=M+2;f.push(P,A,A,w,w,P)}}else return;const p=new(Ko(f)?nl:tl)(f,1);p.version=_;const u=s.get(d);u&&e.remove(u),s.set(d,p)}function h(d){const f=s.get(d);if(f){const m=d.index;m!==null&&f.version<m.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function cf(i,e,t,n){const r=n.isWebGL2;let s;function o(m){s=m}let a,l;function c(m){a=m.type,l=m.bytesPerElement}function h(m,g){i.drawElements(s,g,a,m*l),t.update(g,s,1)}function d(m,g,_){if(_===0)return;let p,u;if(r)p=i,u="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),u="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[u](s,g,a,m*l,_),t.update(g,s,_)}function f(m,g,_){if(_===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let u=0;u<_;u++)this.render(m[u]/l,g[u]);else{p.multiDrawElementsWEBGL(s,g,0,a,m,0,_);let u=0;for(let T=0;T<_;T++)u+=g[T];t.update(u,s,1)}}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=d,this.renderMultiDraw=f}function hf(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function uf(i,e){return i[0]-e[0]}function df(i,e){return Math.abs(e[1])-Math.abs(i[1])}function ff(i,e,t){const n={},r=new Float32Array(8),s=new WeakMap,o=new mt,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,d){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let p=s.get(h);if(p===void 0||p.count!==_){let G=function(){ne.dispose(),s.delete(h),h.removeEventListener("dispose",G)};var m=G;p!==void 0&&p.texture.dispose();const M=h.morphAttributes.position!==void 0,b=h.morphAttributes.normal!==void 0,P=h.morphAttributes.color!==void 0,A=h.morphAttributes.position||[],w=h.morphAttributes.normal||[],q=h.morphAttributes.color||[];let x=0;M===!0&&(x=1),b===!0&&(x=2),P===!0&&(x=3);let y=h.attributes.position.count*x,V=1;y>e.maxTextureSize&&(V=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const X=new Float32Array(y*V*4*_),ne=new Jo(X,y,V,_);ne.type=Sn,ne.needsUpdate=!0;const L=x*4;for(let W=0;W<_;W++){const K=A[W],Y=w[W],Z=q[W],j=y*V*4*W;for(let ie=0;ie<K.count;ie++){const re=ie*L;M===!0&&(o.fromBufferAttribute(K,ie),X[j+re+0]=o.x,X[j+re+1]=o.y,X[j+re+2]=o.z,X[j+re+3]=0),b===!0&&(o.fromBufferAttribute(Y,ie),X[j+re+4]=o.x,X[j+re+5]=o.y,X[j+re+6]=o.z,X[j+re+7]=0),P===!0&&(o.fromBufferAttribute(Z,ie),X[j+re+8]=o.x,X[j+re+9]=o.y,X[j+re+10]=o.z,X[j+re+11]=Z.itemSize===4?o.w:1)}}p={count:_,texture:ne,size:new Se(y,V)},s.set(h,p),h.addEventListener("dispose",G)}let u=0;for(let M=0;M<f.length;M++)u+=f[M];const T=h.morphTargetsRelative?1:1-u;d.getUniforms().setValue(i,"morphTargetBaseInfluence",T),d.getUniforms().setValue(i,"morphTargetInfluences",f),d.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),d.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}else{const g=f===void 0?0:f.length;let _=n[h.id];if(_===void 0||_.length!==g){_=[];for(let b=0;b<g;b++)_[b]=[b,0];n[h.id]=_}for(let b=0;b<g;b++){const P=_[b];P[0]=b,P[1]=f[b]}_.sort(df);for(let b=0;b<8;b++)b<g&&_[b][1]?(a[b][0]=_[b][0],a[b][1]=_[b][1]):(a[b][0]=Number.MAX_SAFE_INTEGER,a[b][1]=0);a.sort(uf);const p=h.morphAttributes.position,u=h.morphAttributes.normal;let T=0;for(let b=0;b<8;b++){const P=a[b],A=P[0],w=P[1];A!==Number.MAX_SAFE_INTEGER&&w?(p&&h.getAttribute("morphTarget"+b)!==p[A]&&h.setAttribute("morphTarget"+b,p[A]),u&&h.getAttribute("morphNormal"+b)!==u[A]&&h.setAttribute("morphNormal"+b,u[A]),r[b]=w,T+=w):(p&&h.hasAttribute("morphTarget"+b)===!0&&h.deleteAttribute("morphTarget"+b),u&&h.hasAttribute("morphNormal"+b)===!0&&h.deleteAttribute("morphNormal"+b),r[b]=0)}const M=h.morphTargetsRelative?1:1-T;d.getUniforms().setValue(i,"morphTargetBaseInfluence",M),d.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:l}}function pf(i,e,t,n){let r=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,d=e.get(l,h);if(r.get(d)!==c&&(e.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return d}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}class cl extends Lt{constructor(e,t,n,r,s,o,a,l,c,h){if(h=h!==void 0?h:Gn,h!==Gn&&h!==Si)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Gn&&(n=xn),n===void 0&&h===Si&&(n=zn),super(null,r,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:wt,this.minFilter=l!==void 0?l:wt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const hl=new Lt,ul=new cl(1,1);ul.compareFunction=Zo;const dl=new Jo,fl=new $c,pl=new sl,ao=[],oo=[],lo=new Float32Array(16),co=new Float32Array(9),ho=new Float32Array(4);function yi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=ao[r];if(s===void 0&&(s=new Float32Array(r),ao[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function ct(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function ht(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Fr(i,e){let t=oo[e];t===void 0&&(t=new Int32Array(e),oo[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function mf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function gf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ct(t,e))return;i.uniform2fv(this.addr,e),ht(t,e)}}function _f(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ct(t,e))return;i.uniform3fv(this.addr,e),ht(t,e)}}function vf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ct(t,e))return;i.uniform4fv(this.addr,e),ht(t,e)}}function xf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ct(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),ht(t,e)}else{if(ct(t,n))return;ho.set(n),i.uniformMatrix2fv(this.addr,!1,ho),ht(t,n)}}function Sf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ct(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),ht(t,e)}else{if(ct(t,n))return;co.set(n),i.uniformMatrix3fv(this.addr,!1,co),ht(t,n)}}function Mf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ct(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),ht(t,e)}else{if(ct(t,n))return;lo.set(n),i.uniformMatrix4fv(this.addr,!1,lo),ht(t,n)}}function Ef(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function yf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ct(t,e))return;i.uniform2iv(this.addr,e),ht(t,e)}}function Tf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ct(t,e))return;i.uniform3iv(this.addr,e),ht(t,e)}}function bf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ct(t,e))return;i.uniform4iv(this.addr,e),ht(t,e)}}function wf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Af(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ct(t,e))return;i.uniform2uiv(this.addr,e),ht(t,e)}}function Rf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ct(t,e))return;i.uniform3uiv(this.addr,e),ht(t,e)}}function Cf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ct(t,e))return;i.uniform4uiv(this.addr,e),ht(t,e)}}function Pf(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);const s=this.type===i.SAMPLER_2D_SHADOW?ul:hl;t.setTexture2D(e||s,r)}function Lf(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||fl,r)}function Df(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||pl,r)}function Uf(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||dl,r)}function If(i){switch(i){case 5126:return mf;case 35664:return gf;case 35665:return _f;case 35666:return vf;case 35674:return xf;case 35675:return Sf;case 35676:return Mf;case 5124:case 35670:return Ef;case 35667:case 35671:return yf;case 35668:case 35672:return Tf;case 35669:case 35673:return bf;case 5125:return wf;case 36294:return Af;case 36295:return Rf;case 36296:return Cf;case 35678:case 36198:case 36298:case 36306:case 35682:return Pf;case 35679:case 36299:case 36307:return Lf;case 35680:case 36300:case 36308:case 36293:return Df;case 36289:case 36303:case 36311:case 36292:return Uf}}function Ff(i,e){i.uniform1fv(this.addr,e)}function Nf(i,e){const t=yi(e,this.size,2);i.uniform2fv(this.addr,t)}function Of(i,e){const t=yi(e,this.size,3);i.uniform3fv(this.addr,t)}function Bf(i,e){const t=yi(e,this.size,4);i.uniform4fv(this.addr,t)}function zf(i,e){const t=yi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Gf(i,e){const t=yi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Hf(i,e){const t=yi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Vf(i,e){i.uniform1iv(this.addr,e)}function kf(i,e){i.uniform2iv(this.addr,e)}function Wf(i,e){i.uniform3iv(this.addr,e)}function Xf(i,e){i.uniform4iv(this.addr,e)}function qf(i,e){i.uniform1uiv(this.addr,e)}function Yf(i,e){i.uniform2uiv(this.addr,e)}function Zf(i,e){i.uniform3uiv(this.addr,e)}function Kf(i,e){i.uniform4uiv(this.addr,e)}function jf(i,e,t){const n=this.cache,r=e.length,s=Fr(t,r);ct(n,s)||(i.uniform1iv(this.addr,s),ht(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||hl,s[o])}function $f(i,e,t){const n=this.cache,r=e.length,s=Fr(t,r);ct(n,s)||(i.uniform1iv(this.addr,s),ht(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||fl,s[o])}function Jf(i,e,t){const n=this.cache,r=e.length,s=Fr(t,r);ct(n,s)||(i.uniform1iv(this.addr,s),ht(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||pl,s[o])}function Qf(i,e,t){const n=this.cache,r=e.length,s=Fr(t,r);ct(n,s)||(i.uniform1iv(this.addr,s),ht(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||dl,s[o])}function ep(i){switch(i){case 5126:return Ff;case 35664:return Nf;case 35665:return Of;case 35666:return Bf;case 35674:return zf;case 35675:return Gf;case 35676:return Hf;case 5124:case 35670:return Vf;case 35667:case 35671:return kf;case 35668:case 35672:return Wf;case 35669:case 35673:return Xf;case 5125:return qf;case 36294:return Yf;case 36295:return Zf;case 36296:return Kf;case 35678:case 36198:case 36298:case 36306:case 35682:return jf;case 35679:case 36299:case 36307:return $f;case 35680:case 36300:case 36308:case 36293:return Jf;case 36289:case 36303:case 36311:case 36292:return Qf}}class tp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=If(t.type)}}class np{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ep(t.type)}}class ip{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],n)}}}const ms=/(\w+)(\])?(\[|\.)?/g;function uo(i,e){i.seq.push(e),i.map[e.id]=e}function rp(i,e,t){const n=i.name,r=n.length;for(ms.lastIndex=0;;){const s=ms.exec(n),o=ms.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){uo(t,c===void 0?new tp(a,i,e):new np(a,i,e));break}else{let d=t.map[a];d===void 0&&(d=new ip(a),uo(t,d)),t=d}}}class Er{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);rp(s,o,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function fo(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const sp=37297;let ap=0;function op(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function lp(i){const e=Ze.getPrimaries(Ze.workingColorSpace),t=Ze.getPrimaries(i);let n;switch(e===t?n="":e===Rr&&t===Ar?n="LinearDisplayP3ToLinearSRGB":e===Ar&&t===Rr&&(n="LinearSRGBToLinearDisplayP3"),i){case dn:case Ir:return[n,"LinearTransferOETF"];case pt:case Vs:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function po(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+op(i.getShaderSource(e),o)}else return r}function cp(i,e){const t=lp(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function hp(i,e){let t;switch(e){case ac:t="Linear";break;case oc:t="Reinhard";break;case lc:t="OptimizedCineon";break;case cc:t="ACESFilmic";break;case uc:t="AgX";break;case hc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function up(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(fi).join(`
`)}function dp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(fi).join(`
`)}function fp(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function pp(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function fi(i){return i!==""}function mo(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function go(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const mp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ls(i){return i.replace(mp,_p)}const gp=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function _p(i,e){let t=Fe[e];if(t===void 0){const n=gp.get(e);if(n!==void 0)t=Fe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ls(t)}const vp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _o(i){return i.replace(vp,xp)}function xp(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function vo(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Sp(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Oo?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Il?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===on&&(e="SHADOWMAP_TYPE_VSM"),e}function Mp(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case vi:case xi:e="ENVMAP_TYPE_CUBE";break;case Ur:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Ep(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case xi:e="ENVMAP_MODE_REFRACTION";break}return e}function yp(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Bo:e="ENVMAP_BLENDING_MULTIPLY";break;case rc:e="ENVMAP_BLENDING_MIX";break;case sc:e="ENVMAP_BLENDING_ADD";break}return e}function Tp(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function bp(i,e,t,n){const r=i.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Sp(t),c=Mp(t),h=Ep(t),d=yp(t),f=Tp(t),m=t.isWebGL2?"":up(t),g=dp(t),_=fp(s),p=r.createProgram();let u,T,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(fi).join(`
`),u.length>0&&(u+=`
`),T=[m,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(fi).join(`
`),T.length>0&&(T+=`
`)):(u=[vo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fi).join(`
`),T=[m,vo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==En?"#define TONE_MAPPING":"",t.toneMapping!==En?Fe.tonemapping_pars_fragment:"",t.toneMapping!==En?hp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Fe.colorspace_pars_fragment,cp("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(fi).join(`
`)),o=Ls(o),o=mo(o,t),o=go(o,t),a=Ls(a),a=mo(a,t),a=go(a,t),o=_o(o),a=_o(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,u=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,T=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Fa?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Fa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+T);const b=M+u+o,P=M+T+a,A=fo(r,r.VERTEX_SHADER,b),w=fo(r,r.FRAGMENT_SHADER,P);r.attachShader(p,A),r.attachShader(p,w),t.index0AttributeName!==void 0?r.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(p,0,"position"),r.linkProgram(p);function q(X){if(i.debug.checkShaderErrors){const ne=r.getProgramInfoLog(p).trim(),L=r.getShaderInfoLog(A).trim(),G=r.getShaderInfoLog(w).trim();let W=!0,K=!0;if(r.getProgramParameter(p,r.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,p,A,w);else{const Y=po(r,A,"vertex"),Z=po(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(p,r.VALIDATE_STATUS)+`

Program Info Log: `+ne+`
`+Y+`
`+Z)}else ne!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ne):(L===""||G==="")&&(K=!1);K&&(X.diagnostics={runnable:W,programLog:ne,vertexShader:{log:L,prefix:u},fragmentShader:{log:G,prefix:T}})}r.deleteShader(A),r.deleteShader(w),x=new Er(r,p),y=pp(r,p)}let x;this.getUniforms=function(){return x===void 0&&q(this),x};let y;this.getAttributes=function(){return y===void 0&&q(this),y};let V=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return V===!1&&(V=r.getProgramParameter(p,sp)),V},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ap++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=A,this.fragmentShader=w,this}let wp=0;class Ap{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Rp(e),t.set(e,n)),n}}class Rp{constructor(e){this.id=wp++,this.code=e,this.usedTimes=0}}function Cp(i,e,t,n,r,s,o){const a=new Qo,l=new Ap,c=[],h=r.isWebGL2,d=r.logarithmicDepthBuffer,f=r.vertexTextures;let m=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return x===0?"uv":`uv${x}`}function p(x,y,V,X,ne){const L=X.fog,G=ne.geometry,W=x.isMeshStandardMaterial?X.environment:null,K=(x.isMeshStandardMaterial?t:e).get(x.envMap||W),Y=K&&K.mapping===Ur?K.image.height:null,Z=g[x.type];x.precision!==null&&(m=r.getMaxPrecision(x.precision),m!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",m,"instead."));const j=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ie=j!==void 0?j.length:0;let re=0;G.morphAttributes.position!==void 0&&(re=1),G.morphAttributes.normal!==void 0&&(re=2),G.morphAttributes.color!==void 0&&(re=3);let k,$,he,ve;if(Z){const Mt=Jt[Z];k=Mt.vertexShader,$=Mt.fragmentShader}else k=x.vertexShader,$=x.fragmentShader,l.update(x),he=l.getVertexShaderID(x),ve=l.getFragmentShaderID(x);const _e=i.getRenderTarget(),Le=ne.isInstancedMesh===!0,Ue=ne.isBatchedMesh===!0,be=!!x.map,We=!!x.matcap,N=!!K,St=!!x.aoMap,Me=!!x.lightMap,Ce=!!x.bumpMap,pe=!!x.normalMap,et=!!x.displacementMap,Ne=!!x.emissiveMap,E=!!x.metalnessMap,v=!!x.roughnessMap,B=x.anisotropy>0,ee=x.clearcoat>0,Q=x.iridescence>0,te=x.sheen>0,me=x.transmission>0,ce=B&&!!x.anisotropyMap,de=ee&&!!x.clearcoatMap,Te=ee&&!!x.clearcoatNormalMap,Oe=ee&&!!x.clearcoatRoughnessMap,J=Q&&!!x.iridescenceMap,qe=Q&&!!x.iridescenceThicknessMap,Ve=te&&!!x.sheenColorMap,Re=te&&!!x.sheenRoughnessMap,xe=!!x.specularMap,fe=!!x.specularColorMap,Ie=!!x.specularIntensityMap,Xe=me&&!!x.transmissionMap,nt=me&&!!x.thicknessMap,ze=!!x.gradientMap,se=!!x.alphaMap,C=x.alphaTest>0,oe=!!x.alphaHash,le=!!x.extensions,we=!!G.attributes.uv1,Ee=!!G.attributes.uv2,Ke=!!G.attributes.uv3;let je=En;return x.toneMapped&&(_e===null||_e.isXRRenderTarget===!0)&&(je=i.toneMapping),{isWebGL2:h,shaderID:Z,shaderType:x.type,shaderName:x.name,vertexShader:k,fragmentShader:$,defines:x.defines,customVertexShaderID:he,customFragmentShaderID:ve,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:m,batching:Ue,instancing:Le,instancingColor:Le&&ne.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:_e===null?i.outputColorSpace:_e.isXRRenderTarget===!0?_e.texture.colorSpace:dn,map:be,matcap:We,envMap:N,envMapMode:N&&K.mapping,envMapCubeUVHeight:Y,aoMap:St,lightMap:Me,bumpMap:Ce,normalMap:pe,displacementMap:f&&et,emissiveMap:Ne,normalMapObjectSpace:pe&&x.normalMapType===Tc,normalMapTangentSpace:pe&&x.normalMapType===yc,metalnessMap:E,roughnessMap:v,anisotropy:B,anisotropyMap:ce,clearcoat:ee,clearcoatMap:de,clearcoatNormalMap:Te,clearcoatRoughnessMap:Oe,iridescence:Q,iridescenceMap:J,iridescenceThicknessMap:qe,sheen:te,sheenColorMap:Ve,sheenRoughnessMap:Re,specularMap:xe,specularColorMap:fe,specularIntensityMap:Ie,transmission:me,transmissionMap:Xe,thicknessMap:nt,gradientMap:ze,opaque:x.transparent===!1&&x.blending===pi,alphaMap:se,alphaTest:C,alphaHash:oe,combine:x.combine,mapUv:be&&_(x.map.channel),aoMapUv:St&&_(x.aoMap.channel),lightMapUv:Me&&_(x.lightMap.channel),bumpMapUv:Ce&&_(x.bumpMap.channel),normalMapUv:pe&&_(x.normalMap.channel),displacementMapUv:et&&_(x.displacementMap.channel),emissiveMapUv:Ne&&_(x.emissiveMap.channel),metalnessMapUv:E&&_(x.metalnessMap.channel),roughnessMapUv:v&&_(x.roughnessMap.channel),anisotropyMapUv:ce&&_(x.anisotropyMap.channel),clearcoatMapUv:de&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:Te&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Oe&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:qe&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:Ve&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:Re&&_(x.sheenRoughnessMap.channel),specularMapUv:xe&&_(x.specularMap.channel),specularColorMapUv:fe&&_(x.specularColorMap.channel),specularIntensityMapUv:Ie&&_(x.specularIntensityMap.channel),transmissionMapUv:Xe&&_(x.transmissionMap.channel),thicknessMapUv:nt&&_(x.thicknessMap.channel),alphaMapUv:se&&_(x.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(pe||B),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,vertexUv1s:we,vertexUv2s:Ee,vertexUv3s:Ke,pointsUvs:ne.isPoints===!0&&!!G.attributes.uv&&(be||se),fog:!!L,useFog:x.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:ne.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:ie,morphTextureStride:re,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&V.length>0,shadowMapType:i.shadowMap.type,toneMapping:je,useLegacyLights:i._useLegacyLights,decodeVideoTexture:be&&x.map.isVideoTexture===!0&&Ze.getTransfer(x.map.colorSpace)===Je,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===ln,flipSided:x.side===Pt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionDerivatives:le&&x.extensions.derivatives===!0,extensionFragDepth:le&&x.extensions.fragDepth===!0,extensionDrawBuffers:le&&x.extensions.drawBuffers===!0,extensionShaderTextureLOD:le&&x.extensions.shaderTextureLOD===!0,extensionClipCullDistance:le&&x.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()}}function u(x){const y=[];if(x.shaderID?y.push(x.shaderID):(y.push(x.customVertexShaderID),y.push(x.customFragmentShaderID)),x.defines!==void 0)for(const V in x.defines)y.push(V),y.push(x.defines[V]);return x.isRawShaderMaterial===!1&&(T(y,x),M(y,x),y.push(i.outputColorSpace)),y.push(x.customProgramCacheKey),y.join()}function T(x,y){x.push(y.precision),x.push(y.outputColorSpace),x.push(y.envMapMode),x.push(y.envMapCubeUVHeight),x.push(y.mapUv),x.push(y.alphaMapUv),x.push(y.lightMapUv),x.push(y.aoMapUv),x.push(y.bumpMapUv),x.push(y.normalMapUv),x.push(y.displacementMapUv),x.push(y.emissiveMapUv),x.push(y.metalnessMapUv),x.push(y.roughnessMapUv),x.push(y.anisotropyMapUv),x.push(y.clearcoatMapUv),x.push(y.clearcoatNormalMapUv),x.push(y.clearcoatRoughnessMapUv),x.push(y.iridescenceMapUv),x.push(y.iridescenceThicknessMapUv),x.push(y.sheenColorMapUv),x.push(y.sheenRoughnessMapUv),x.push(y.specularMapUv),x.push(y.specularColorMapUv),x.push(y.specularIntensityMapUv),x.push(y.transmissionMapUv),x.push(y.thicknessMapUv),x.push(y.combine),x.push(y.fogExp2),x.push(y.sizeAttenuation),x.push(y.morphTargetsCount),x.push(y.morphAttributeCount),x.push(y.numDirLights),x.push(y.numPointLights),x.push(y.numSpotLights),x.push(y.numSpotLightMaps),x.push(y.numHemiLights),x.push(y.numRectAreaLights),x.push(y.numDirLightShadows),x.push(y.numPointLightShadows),x.push(y.numSpotLightShadows),x.push(y.numSpotLightShadowsWithMaps),x.push(y.numLightProbes),x.push(y.shadowMapType),x.push(y.toneMapping),x.push(y.numClippingPlanes),x.push(y.numClipIntersection),x.push(y.depthPacking)}function M(x,y){a.disableAll(),y.isWebGL2&&a.enable(0),y.supportsVertexTextures&&a.enable(1),y.instancing&&a.enable(2),y.instancingColor&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),x.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.skinning&&a.enable(4),y.morphTargets&&a.enable(5),y.morphNormals&&a.enable(6),y.morphColors&&a.enable(7),y.premultipliedAlpha&&a.enable(8),y.shadowMapEnabled&&a.enable(9),y.useLegacyLights&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),x.push(a.mask)}function b(x){const y=g[x.type];let V;if(y){const X=Jt[y];V=hh.clone(X.uniforms)}else V=x.uniforms;return V}function P(x,y){let V;for(let X=0,ne=c.length;X<ne;X++){const L=c[X];if(L.cacheKey===y){V=L,++V.usedTimes;break}}return V===void 0&&(V=new bp(i,y,x,s),c.push(V)),V}function A(x){if(--x.usedTimes===0){const y=c.indexOf(x);c[y]=c[c.length-1],c.pop(),x.destroy()}}function w(x){l.remove(x)}function q(){l.dispose()}return{getParameters:p,getProgramCacheKey:u,getUniforms:b,acquireProgram:P,releaseProgram:A,releaseShaderCache:w,programs:c,dispose:q}}function Pp(){let i=new WeakMap;function e(s){let o=i.get(s);return o===void 0&&(o={},i.set(s,o)),o}function t(s){i.delete(s)}function n(s,o,a){i.get(s)[o]=a}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function Lp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function xo(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function So(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(d,f,m,g,_,p){let u=i[e];return u===void 0?(u={id:d.id,object:d,geometry:f,material:m,groupOrder:g,renderOrder:d.renderOrder,z:_,group:p},i[e]=u):(u.id=d.id,u.object=d,u.geometry=f,u.material=m,u.groupOrder=g,u.renderOrder=d.renderOrder,u.z=_,u.group=p),e++,u}function a(d,f,m,g,_,p){const u=o(d,f,m,g,_,p);m.transmission>0?n.push(u):m.transparent===!0?r.push(u):t.push(u)}function l(d,f,m,g,_,p){const u=o(d,f,m,g,_,p);m.transmission>0?n.unshift(u):m.transparent===!0?r.unshift(u):t.unshift(u)}function c(d,f){t.length>1&&t.sort(d||Lp),n.length>1&&n.sort(f||xo),r.length>1&&r.sort(f||xo)}function h(){for(let d=e,f=i.length;d<f;d++){const m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:l,finish:h,sort:c}}function Dp(){let i=new WeakMap;function e(n,r){const s=i.get(n);let o;return s===void 0?(o=new So,i.set(n,[o])):r>=s.length?(o=new So,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Up(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new ke};break;case"SpotLight":t={position:new R,direction:new R,color:new ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new ke,groundColor:new ke};break;case"RectAreaLight":t={color:new ke,position:new R,halfWidth:new R,halfHeight:new R};break}return i[e.id]=t,t}}}function Ip(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Fp=0;function Np(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Op(i,e){const t=new Up,n=Ip(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)r.probe.push(new R);const s=new R,o=new at,a=new at;function l(h,d){let f=0,m=0,g=0;for(let X=0;X<9;X++)r.probe[X].set(0,0,0);let _=0,p=0,u=0,T=0,M=0,b=0,P=0,A=0,w=0,q=0,x=0;h.sort(Np);const y=d===!0?Math.PI:1;for(let X=0,ne=h.length;X<ne;X++){const L=h[X],G=L.color,W=L.intensity,K=L.distance,Y=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)f+=G.r*W*y,m+=G.g*W*y,g+=G.b*W*y;else if(L.isLightProbe){for(let Z=0;Z<9;Z++)r.probe[Z].addScaledVector(L.sh.coefficients[Z],W);x++}else if(L.isDirectionalLight){const Z=t.get(L);if(Z.color.copy(L.color).multiplyScalar(L.intensity*y),L.castShadow){const j=L.shadow,ie=n.get(L);ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize=j.mapSize,r.directionalShadow[_]=ie,r.directionalShadowMap[_]=Y,r.directionalShadowMatrix[_]=L.shadow.matrix,b++}r.directional[_]=Z,_++}else if(L.isSpotLight){const Z=t.get(L);Z.position.setFromMatrixPosition(L.matrixWorld),Z.color.copy(G).multiplyScalar(W*y),Z.distance=K,Z.coneCos=Math.cos(L.angle),Z.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Z.decay=L.decay,r.spot[u]=Z;const j=L.shadow;if(L.map&&(r.spotLightMap[w]=L.map,w++,j.updateMatrices(L),L.castShadow&&q++),r.spotLightMatrix[u]=j.matrix,L.castShadow){const ie=n.get(L);ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize=j.mapSize,r.spotShadow[u]=ie,r.spotShadowMap[u]=Y,A++}u++}else if(L.isRectAreaLight){const Z=t.get(L);Z.color.copy(G).multiplyScalar(W),Z.halfWidth.set(L.width*.5,0,0),Z.halfHeight.set(0,L.height*.5,0),r.rectArea[T]=Z,T++}else if(L.isPointLight){const Z=t.get(L);if(Z.color.copy(L.color).multiplyScalar(L.intensity*y),Z.distance=L.distance,Z.decay=L.decay,L.castShadow){const j=L.shadow,ie=n.get(L);ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize=j.mapSize,ie.shadowCameraNear=j.camera.near,ie.shadowCameraFar=j.camera.far,r.pointShadow[p]=ie,r.pointShadowMap[p]=Y,r.pointShadowMatrix[p]=L.shadow.matrix,P++}r.point[p]=Z,p++}else if(L.isHemisphereLight){const Z=t.get(L);Z.skyColor.copy(L.color).multiplyScalar(W*y),Z.groundColor.copy(L.groundColor).multiplyScalar(W*y),r.hemi[M]=Z,M++}}T>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ae.LTC_FLOAT_1,r.rectAreaLTC2=ae.LTC_FLOAT_2):(r.rectAreaLTC1=ae.LTC_HALF_1,r.rectAreaLTC2=ae.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ae.LTC_FLOAT_1,r.rectAreaLTC2=ae.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=ae.LTC_HALF_1,r.rectAreaLTC2=ae.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=f,r.ambient[1]=m,r.ambient[2]=g;const V=r.hash;(V.directionalLength!==_||V.pointLength!==p||V.spotLength!==u||V.rectAreaLength!==T||V.hemiLength!==M||V.numDirectionalShadows!==b||V.numPointShadows!==P||V.numSpotShadows!==A||V.numSpotMaps!==w||V.numLightProbes!==x)&&(r.directional.length=_,r.spot.length=u,r.rectArea.length=T,r.point.length=p,r.hemi.length=M,r.directionalShadow.length=b,r.directionalShadowMap.length=b,r.pointShadow.length=P,r.pointShadowMap.length=P,r.spotShadow.length=A,r.spotShadowMap.length=A,r.directionalShadowMatrix.length=b,r.pointShadowMatrix.length=P,r.spotLightMatrix.length=A+w-q,r.spotLightMap.length=w,r.numSpotLightShadowsWithMaps=q,r.numLightProbes=x,V.directionalLength=_,V.pointLength=p,V.spotLength=u,V.rectAreaLength=T,V.hemiLength=M,V.numDirectionalShadows=b,V.numPointShadows=P,V.numSpotShadows=A,V.numSpotMaps=w,V.numLightProbes=x,r.version=Fp++)}function c(h,d){let f=0,m=0,g=0,_=0,p=0;const u=d.matrixWorldInverse;for(let T=0,M=h.length;T<M;T++){const b=h[T];if(b.isDirectionalLight){const P=r.directional[f];P.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(u),f++}else if(b.isSpotLight){const P=r.spot[g];P.position.setFromMatrixPosition(b.matrixWorld),P.position.applyMatrix4(u),P.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(u),g++}else if(b.isRectAreaLight){const P=r.rectArea[_];P.position.setFromMatrixPosition(b.matrixWorld),P.position.applyMatrix4(u),a.identity(),o.copy(b.matrixWorld),o.premultiply(u),a.extractRotation(o),P.halfWidth.set(b.width*.5,0,0),P.halfHeight.set(0,b.height*.5,0),P.halfWidth.applyMatrix4(a),P.halfHeight.applyMatrix4(a),_++}else if(b.isPointLight){const P=r.point[m];P.position.setFromMatrixPosition(b.matrixWorld),P.position.applyMatrix4(u),m++}else if(b.isHemisphereLight){const P=r.hemi[p];P.direction.setFromMatrixPosition(b.matrixWorld),P.direction.transformDirection(u),p++}}}return{setup:l,setupView:c,state:r}}function Mo(i,e){const t=new Op(i,e),n=[],r=[];function s(){n.length=0,r.length=0}function o(d){n.push(d)}function a(d){r.push(d)}function l(d){t.setup(n,d)}function c(d){t.setupView(n,d)}return{init:s,state:{lightsArray:n,shadowsArray:r,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function Bp(i,e){let t=new WeakMap;function n(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new Mo(i,e),t.set(s,[l])):o>=a.length?(l=new Mo(i,e),a.push(l)):l=a[o],l}function r(){t=new WeakMap}return{get:n,dispose:r}}class zp extends Kt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Mc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Gp extends Kt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Hp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Vp=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function kp(i,e,t){let n=new al;const r=new Se,s=new Se,o=new mt,a=new zp({depthPacking:Ec}),l=new Gp,c={},h=t.maxTextureSize,d={[bn]:Pt,[Pt]:bn,[ln]:ln},f=new Wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Se},radius:{value:4}},vertexShader:Hp,fragmentShader:Vp}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new lt;g.setAttribute("position",new Vt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Qe(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Oo;let u=this.type;this.render=function(A,w,q){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;const x=i.getRenderTarget(),y=i.getActiveCubeFace(),V=i.getActiveMipmapLevel(),X=i.state;X.setBlending(Mn),X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);const ne=u!==on&&this.type===on,L=u===on&&this.type!==on;for(let G=0,W=A.length;G<W;G++){const K=A[G],Y=K.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;r.copy(Y.mapSize);const Z=Y.getFrameExtents();if(r.multiply(Z),s.copy(Y.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/Z.x),r.x=s.x*Z.x,Y.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/Z.y),r.y=s.y*Z.y,Y.mapSize.y=s.y)),Y.map===null||ne===!0||L===!0){const ie=this.type!==on?{minFilter:wt,magFilter:wt}:{};Y.map!==null&&Y.map.dispose(),Y.map=new Vn(r.x,r.y,ie),Y.map.texture.name=K.name+".shadowMap",Y.camera.updateProjectionMatrix()}i.setRenderTarget(Y.map),i.clear();const j=Y.getViewportCount();for(let ie=0;ie<j;ie++){const re=Y.getViewport(ie);o.set(s.x*re.x,s.y*re.y,s.x*re.z,s.y*re.w),X.viewport(o),Y.updateMatrices(K,ie),n=Y.getFrustum(),b(w,q,Y.camera,K,this.type)}Y.isPointLightShadow!==!0&&this.type===on&&T(Y,q),Y.needsUpdate=!1}u=this.type,p.needsUpdate=!1,i.setRenderTarget(x,y,V)};function T(A,w){const q=e.update(_);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Vn(r.x,r.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(w,null,q,f,_,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(w,null,q,m,_,null)}function M(A,w,q,x){let y=null;const V=q.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(V!==void 0)y=V;else if(y=q.isPointLight===!0?l:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const X=y.uuid,ne=w.uuid;let L=c[X];L===void 0&&(L={},c[X]=L);let G=L[ne];G===void 0&&(G=y.clone(),L[ne]=G,w.addEventListener("dispose",P)),y=G}if(y.visible=w.visible,y.wireframe=w.wireframe,x===on?y.side=w.shadowSide!==null?w.shadowSide:w.side:y.side=w.shadowSide!==null?w.shadowSide:d[w.side],y.alphaMap=w.alphaMap,y.alphaTest=w.alphaTest,y.map=w.map,y.clipShadows=w.clipShadows,y.clippingPlanes=w.clippingPlanes,y.clipIntersection=w.clipIntersection,y.displacementMap=w.displacementMap,y.displacementScale=w.displacementScale,y.displacementBias=w.displacementBias,y.wireframeLinewidth=w.wireframeLinewidth,y.linewidth=w.linewidth,q.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const X=i.properties.get(y);X.light=q}return y}function b(A,w,q,x,y){if(A.visible===!1)return;if(A.layers.test(w.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&y===on)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,A.matrixWorld);const ne=e.update(A),L=A.material;if(Array.isArray(L)){const G=ne.groups;for(let W=0,K=G.length;W<K;W++){const Y=G[W],Z=L[Y.materialIndex];if(Z&&Z.visible){const j=M(A,Z,x,y);A.onBeforeShadow(i,A,w,q,ne,j,Y),i.renderBufferDirect(q,null,ne,j,A,Y),A.onAfterShadow(i,A,w,q,ne,j,Y)}}}else if(L.visible){const G=M(A,L,x,y);A.onBeforeShadow(i,A,w,q,ne,G,null),i.renderBufferDirect(q,null,ne,G,A,null),A.onAfterShadow(i,A,w,q,ne,G,null)}}const X=A.children;for(let ne=0,L=X.length;ne<L;ne++)b(X[ne],w,q,x,y)}function P(A){A.target.removeEventListener("dispose",P);for(const q in c){const x=c[q],y=A.target.uuid;y in x&&(x[y].dispose(),delete x[y])}}}function Wp(i,e,t){const n=t.isWebGL2;function r(){let C=!1;const oe=new mt;let le=null;const we=new mt(0,0,0,0);return{setMask:function(Ee){le!==Ee&&!C&&(i.colorMask(Ee,Ee,Ee,Ee),le=Ee)},setLocked:function(Ee){C=Ee},setClear:function(Ee,Ke,je,ut,Mt){Mt===!0&&(Ee*=ut,Ke*=ut,je*=ut),oe.set(Ee,Ke,je,ut),we.equals(oe)===!1&&(i.clearColor(Ee,Ke,je,ut),we.copy(oe))},reset:function(){C=!1,le=null,we.set(-1,0,0,0)}}}function s(){let C=!1,oe=null,le=null,we=null;return{setTest:function(Ee){Ee?Ue(i.DEPTH_TEST):be(i.DEPTH_TEST)},setMask:function(Ee){oe!==Ee&&!C&&(i.depthMask(Ee),oe=Ee)},setFunc:function(Ee){if(le!==Ee){switch(Ee){case $l:i.depthFunc(i.NEVER);break;case Jl:i.depthFunc(i.ALWAYS);break;case Ql:i.depthFunc(i.LESS);break;case br:i.depthFunc(i.LEQUAL);break;case ec:i.depthFunc(i.EQUAL);break;case tc:i.depthFunc(i.GEQUAL);break;case nc:i.depthFunc(i.GREATER);break;case ic:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}le=Ee}},setLocked:function(Ee){C=Ee},setClear:function(Ee){we!==Ee&&(i.clearDepth(Ee),we=Ee)},reset:function(){C=!1,oe=null,le=null,we=null}}}function o(){let C=!1,oe=null,le=null,we=null,Ee=null,Ke=null,je=null,ut=null,Mt=null;return{setTest:function($e){C||($e?Ue(i.STENCIL_TEST):be(i.STENCIL_TEST))},setMask:function($e){oe!==$e&&!C&&(i.stencilMask($e),oe=$e)},setFunc:function($e,Et,$t){(le!==$e||we!==Et||Ee!==$t)&&(i.stencilFunc($e,Et,$t),le=$e,we=Et,Ee=$t)},setOp:function($e,Et,$t){(Ke!==$e||je!==Et||ut!==$t)&&(i.stencilOp($e,Et,$t),Ke=$e,je=Et,ut=$t)},setLocked:function($e){C=$e},setClear:function($e){Mt!==$e&&(i.clearStencil($e),Mt=$e)},reset:function(){C=!1,oe=null,le=null,we=null,Ee=null,Ke=null,je=null,ut=null,Mt=null}}}const a=new r,l=new s,c=new o,h=new WeakMap,d=new WeakMap;let f={},m={},g=new WeakMap,_=[],p=null,u=!1,T=null,M=null,b=null,P=null,A=null,w=null,q=null,x=new ke(0,0,0),y=0,V=!1,X=null,ne=null,L=null,G=null,W=null;const K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,Z=0;const j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(j)[1]),Y=Z>=1):j.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),Y=Z>=2);let ie=null,re={};const k=i.getParameter(i.SCISSOR_BOX),$=i.getParameter(i.VIEWPORT),he=new mt().fromArray(k),ve=new mt().fromArray($);function _e(C,oe,le,we){const Ee=new Uint8Array(4),Ke=i.createTexture();i.bindTexture(C,Ke),i.texParameteri(C,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(C,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let je=0;je<le;je++)n&&(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)?i.texImage3D(oe,0,i.RGBA,1,1,we,0,i.RGBA,i.UNSIGNED_BYTE,Ee):i.texImage2D(oe+je,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ee);return Ke}const Le={};Le[i.TEXTURE_2D]=_e(i.TEXTURE_2D,i.TEXTURE_2D,1),Le[i.TEXTURE_CUBE_MAP]=_e(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Le[i.TEXTURE_2D_ARRAY]=_e(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Le[i.TEXTURE_3D]=_e(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ue(i.DEPTH_TEST),l.setFunc(br),Ne(!1),E(ia),Ue(i.CULL_FACE),pe(Mn);function Ue(C){f[C]!==!0&&(i.enable(C),f[C]=!0)}function be(C){f[C]!==!1&&(i.disable(C),f[C]=!1)}function We(C,oe){return m[C]!==oe?(i.bindFramebuffer(C,oe),m[C]=oe,n&&(C===i.DRAW_FRAMEBUFFER&&(m[i.FRAMEBUFFER]=oe),C===i.FRAMEBUFFER&&(m[i.DRAW_FRAMEBUFFER]=oe)),!0):!1}function N(C,oe){let le=_,we=!1;if(C)if(le=g.get(oe),le===void 0&&(le=[],g.set(oe,le)),C.isWebGLMultipleRenderTargets){const Ee=C.texture;if(le.length!==Ee.length||le[0]!==i.COLOR_ATTACHMENT0){for(let Ke=0,je=Ee.length;Ke<je;Ke++)le[Ke]=i.COLOR_ATTACHMENT0+Ke;le.length=Ee.length,we=!0}}else le[0]!==i.COLOR_ATTACHMENT0&&(le[0]=i.COLOR_ATTACHMENT0,we=!0);else le[0]!==i.BACK&&(le[0]=i.BACK,we=!0);we&&(t.isWebGL2?i.drawBuffers(le):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(le))}function St(C){return p!==C?(i.useProgram(C),p=C,!0):!1}const Me={[Fn]:i.FUNC_ADD,[Nl]:i.FUNC_SUBTRACT,[Ol]:i.FUNC_REVERSE_SUBTRACT};if(n)Me[aa]=i.MIN,Me[oa]=i.MAX;else{const C=e.get("EXT_blend_minmax");C!==null&&(Me[aa]=C.MIN_EXT,Me[oa]=C.MAX_EXT)}const Ce={[Bl]:i.ZERO,[zl]:i.ONE,[Gl]:i.SRC_COLOR,[Es]:i.SRC_ALPHA,[ql]:i.SRC_ALPHA_SATURATE,[Wl]:i.DST_COLOR,[Vl]:i.DST_ALPHA,[Hl]:i.ONE_MINUS_SRC_COLOR,[ys]:i.ONE_MINUS_SRC_ALPHA,[Xl]:i.ONE_MINUS_DST_COLOR,[kl]:i.ONE_MINUS_DST_ALPHA,[Yl]:i.CONSTANT_COLOR,[Zl]:i.ONE_MINUS_CONSTANT_COLOR,[Kl]:i.CONSTANT_ALPHA,[jl]:i.ONE_MINUS_CONSTANT_ALPHA};function pe(C,oe,le,we,Ee,Ke,je,ut,Mt,$e){if(C===Mn){u===!0&&(be(i.BLEND),u=!1);return}if(u===!1&&(Ue(i.BLEND),u=!0),C!==Fl){if(C!==T||$e!==V){if((M!==Fn||A!==Fn)&&(i.blendEquation(i.FUNC_ADD),M=Fn,A=Fn),$e)switch(C){case pi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Tr:i.blendFunc(i.ONE,i.ONE);break;case ra:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case sa:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}else switch(C){case pi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Tr:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case ra:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case sa:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}b=null,P=null,w=null,q=null,x.set(0,0,0),y=0,T=C,V=$e}return}Ee=Ee||oe,Ke=Ke||le,je=je||we,(oe!==M||Ee!==A)&&(i.blendEquationSeparate(Me[oe],Me[Ee]),M=oe,A=Ee),(le!==b||we!==P||Ke!==w||je!==q)&&(i.blendFuncSeparate(Ce[le],Ce[we],Ce[Ke],Ce[je]),b=le,P=we,w=Ke,q=je),(ut.equals(x)===!1||Mt!==y)&&(i.blendColor(ut.r,ut.g,ut.b,Mt),x.copy(ut),y=Mt),T=C,V=!1}function et(C,oe){C.side===ln?be(i.CULL_FACE):Ue(i.CULL_FACE);let le=C.side===Pt;oe&&(le=!le),Ne(le),C.blending===pi&&C.transparent===!1?pe(Mn):pe(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),l.setFunc(C.depthFunc),l.setTest(C.depthTest),l.setMask(C.depthWrite),a.setMask(C.colorWrite);const we=C.stencilWrite;c.setTest(we),we&&(c.setMask(C.stencilWriteMask),c.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),c.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),B(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?Ue(i.SAMPLE_ALPHA_TO_COVERAGE):be(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ne(C){X!==C&&(C?i.frontFace(i.CW):i.frontFace(i.CCW),X=C)}function E(C){C!==Dl?(Ue(i.CULL_FACE),C!==ne&&(C===ia?i.cullFace(i.BACK):C===Ul?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):be(i.CULL_FACE),ne=C}function v(C){C!==L&&(Y&&i.lineWidth(C),L=C)}function B(C,oe,le){C?(Ue(i.POLYGON_OFFSET_FILL),(G!==oe||W!==le)&&(i.polygonOffset(oe,le),G=oe,W=le)):be(i.POLYGON_OFFSET_FILL)}function ee(C){C?Ue(i.SCISSOR_TEST):be(i.SCISSOR_TEST)}function Q(C){C===void 0&&(C=i.TEXTURE0+K-1),ie!==C&&(i.activeTexture(C),ie=C)}function te(C,oe,le){le===void 0&&(ie===null?le=i.TEXTURE0+K-1:le=ie);let we=re[le];we===void 0&&(we={type:void 0,texture:void 0},re[le]=we),(we.type!==C||we.texture!==oe)&&(ie!==le&&(i.activeTexture(le),ie=le),i.bindTexture(C,oe||Le[C]),we.type=C,we.texture=oe)}function me(){const C=re[ie];C!==void 0&&C.type!==void 0&&(i.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function ce(){try{i.compressedTexImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function de(){try{i.compressedTexImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Te(){try{i.texSubImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Oe(){try{i.texSubImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function J(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function qe(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Ve(){try{i.texStorage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Re(){try{i.texStorage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function xe(){try{i.texImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function fe(){try{i.texImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Ie(C){he.equals(C)===!1&&(i.scissor(C.x,C.y,C.z,C.w),he.copy(C))}function Xe(C){ve.equals(C)===!1&&(i.viewport(C.x,C.y,C.z,C.w),ve.copy(C))}function nt(C,oe){let le=d.get(oe);le===void 0&&(le=new WeakMap,d.set(oe,le));let we=le.get(C);we===void 0&&(we=i.getUniformBlockIndex(oe,C.name),le.set(C,we))}function ze(C,oe){const we=d.get(oe).get(C);h.get(oe)!==we&&(i.uniformBlockBinding(oe,we,C.__bindingPointIndex),h.set(oe,we))}function se(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},ie=null,re={},m={},g=new WeakMap,_=[],p=null,u=!1,T=null,M=null,b=null,P=null,A=null,w=null,q=null,x=new ke(0,0,0),y=0,V=!1,X=null,ne=null,L=null,G=null,W=null,he.set(0,0,i.canvas.width,i.canvas.height),ve.set(0,0,i.canvas.width,i.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Ue,disable:be,bindFramebuffer:We,drawBuffers:N,useProgram:St,setBlending:pe,setMaterial:et,setFlipSided:Ne,setCullFace:E,setLineWidth:v,setPolygonOffset:B,setScissorTest:ee,activeTexture:Q,bindTexture:te,unbindTexture:me,compressedTexImage2D:ce,compressedTexImage3D:de,texImage2D:xe,texImage3D:fe,updateUBOMapping:nt,uniformBlockBinding:ze,texStorage2D:Ve,texStorage3D:Re,texSubImage2D:Te,texSubImage3D:Oe,compressedTexSubImage2D:J,compressedTexSubImage3D:qe,scissor:Ie,viewport:Xe,reset:se}}function Xp(i,e,t,n,r,s,o){const a=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let d;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,v){return m?new OffscreenCanvas(E,v):Lr("canvas")}function _(E,v,B,ee){let Q=1;if((E.width>ee||E.height>ee)&&(Q=ee/Math.max(E.width,E.height)),Q<1||v===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){const te=v?Pr:Math.floor,me=te(Q*E.width),ce=te(Q*E.height);d===void 0&&(d=g(me,ce));const de=B?g(me,ce):d;return de.width=me,de.height=ce,de.getContext("2d").drawImage(E,0,0,me,ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+me+"x"+ce+")."),de}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function p(E){return Ps(E.width)&&Ps(E.height)}function u(E){return a?!1:E.wrapS!==Yt||E.wrapT!==Yt||E.minFilter!==wt&&E.minFilter!==Bt}function T(E,v){return E.generateMipmaps&&v&&E.minFilter!==wt&&E.minFilter!==Bt}function M(E){i.generateMipmap(E)}function b(E,v,B,ee,Q=!1){if(a===!1)return v;if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let te=v;if(v===i.RED&&(B===i.FLOAT&&(te=i.R32F),B===i.HALF_FLOAT&&(te=i.R16F),B===i.UNSIGNED_BYTE&&(te=i.R8)),v===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(te=i.R8UI),B===i.UNSIGNED_SHORT&&(te=i.R16UI),B===i.UNSIGNED_INT&&(te=i.R32UI),B===i.BYTE&&(te=i.R8I),B===i.SHORT&&(te=i.R16I),B===i.INT&&(te=i.R32I)),v===i.RG&&(B===i.FLOAT&&(te=i.RG32F),B===i.HALF_FLOAT&&(te=i.RG16F),B===i.UNSIGNED_BYTE&&(te=i.RG8)),v===i.RGBA){const me=Q?wr:Ze.getTransfer(ee);B===i.FLOAT&&(te=i.RGBA32F),B===i.HALF_FLOAT&&(te=i.RGBA16F),B===i.UNSIGNED_BYTE&&(te=me===Je?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(te=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(te=i.RGB5_A1)}return(te===i.R16F||te===i.R32F||te===i.RG16F||te===i.RG32F||te===i.RGBA16F||te===i.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function P(E,v,B){return T(E,B)===!0||E.isFramebufferTexture&&E.minFilter!==wt&&E.minFilter!==Bt?Math.log2(Math.max(v.width,v.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?v.mipmaps.length:1}function A(E){return E===wt||E===la||E===Vr?i.NEAREST:i.LINEAR}function w(E){const v=E.target;v.removeEventListener("dispose",w),x(v),v.isVideoTexture&&h.delete(v)}function q(E){const v=E.target;v.removeEventListener("dispose",q),V(v)}function x(E){const v=n.get(E);if(v.__webglInit===void 0)return;const B=E.source,ee=f.get(B);if(ee){const Q=ee[v.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&y(E),Object.keys(ee).length===0&&f.delete(B)}n.remove(E)}function y(E){const v=n.get(E);i.deleteTexture(v.__webglTexture);const B=E.source,ee=f.get(B);delete ee[v.__cacheKey],o.memory.textures--}function V(E){const v=E.texture,B=n.get(E),ee=n.get(v);if(ee.__webglTexture!==void 0&&(i.deleteTexture(ee.__webglTexture),o.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(B.__webglFramebuffer[Q]))for(let te=0;te<B.__webglFramebuffer[Q].length;te++)i.deleteFramebuffer(B.__webglFramebuffer[Q][te]);else i.deleteFramebuffer(B.__webglFramebuffer[Q]);B.__webglDepthbuffer&&i.deleteRenderbuffer(B.__webglDepthbuffer[Q])}else{if(Array.isArray(B.__webglFramebuffer))for(let Q=0;Q<B.__webglFramebuffer.length;Q++)i.deleteFramebuffer(B.__webglFramebuffer[Q]);else i.deleteFramebuffer(B.__webglFramebuffer);if(B.__webglDepthbuffer&&i.deleteRenderbuffer(B.__webglDepthbuffer),B.__webglMultisampledFramebuffer&&i.deleteFramebuffer(B.__webglMultisampledFramebuffer),B.__webglColorRenderbuffer)for(let Q=0;Q<B.__webglColorRenderbuffer.length;Q++)B.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(B.__webglColorRenderbuffer[Q]);B.__webglDepthRenderbuffer&&i.deleteRenderbuffer(B.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let Q=0,te=v.length;Q<te;Q++){const me=n.get(v[Q]);me.__webglTexture&&(i.deleteTexture(me.__webglTexture),o.memory.textures--),n.remove(v[Q])}n.remove(v),n.remove(E)}let X=0;function ne(){X=0}function L(){const E=X;return E>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),X+=1,E}function G(E){const v=[];return v.push(E.wrapS),v.push(E.wrapT),v.push(E.wrapR||0),v.push(E.magFilter),v.push(E.minFilter),v.push(E.anisotropy),v.push(E.internalFormat),v.push(E.format),v.push(E.type),v.push(E.generateMipmaps),v.push(E.premultiplyAlpha),v.push(E.flipY),v.push(E.unpackAlignment),v.push(E.colorSpace),v.join()}function W(E,v){const B=n.get(E);if(E.isVideoTexture&&et(E),E.isRenderTargetTexture===!1&&E.version>0&&B.__version!==E.version){const ee=E.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{he(B,E,v);return}}t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+v)}function K(E,v){const B=n.get(E);if(E.version>0&&B.__version!==E.version){he(B,E,v);return}t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+v)}function Y(E,v){const B=n.get(E);if(E.version>0&&B.__version!==E.version){he(B,E,v);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+v)}function Z(E,v){const B=n.get(E);if(E.version>0&&B.__version!==E.version){ve(B,E,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+v)}const j={[ws]:i.REPEAT,[Yt]:i.CLAMP_TO_EDGE,[As]:i.MIRRORED_REPEAT},ie={[wt]:i.NEAREST,[la]:i.NEAREST_MIPMAP_NEAREST,[Vr]:i.NEAREST_MIPMAP_LINEAR,[Bt]:i.LINEAR,[dc]:i.LINEAR_MIPMAP_NEAREST,[Fi]:i.LINEAR_MIPMAP_LINEAR},re={[bc]:i.NEVER,[Lc]:i.ALWAYS,[wc]:i.LESS,[Zo]:i.LEQUAL,[Ac]:i.EQUAL,[Pc]:i.GEQUAL,[Rc]:i.GREATER,[Cc]:i.NOTEQUAL};function k(E,v,B){if(B?(i.texParameteri(E,i.TEXTURE_WRAP_S,j[v.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,j[v.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,j[v.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,ie[v.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,ie[v.minFilter])):(i.texParameteri(E,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(E,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(v.wrapS!==Yt||v.wrapT!==Yt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(E,i.TEXTURE_MAG_FILTER,A(v.magFilter)),i.texParameteri(E,i.TEXTURE_MIN_FILTER,A(v.minFilter)),v.minFilter!==wt&&v.minFilter!==Bt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),v.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,re[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ee=e.get("EXT_texture_filter_anisotropic");if(v.magFilter===wt||v.minFilter!==Vr&&v.minFilter!==Fi||v.type===Sn&&e.has("OES_texture_float_linear")===!1||a===!1&&v.type===Ni&&e.has("OES_texture_half_float_linear")===!1)return;(v.anisotropy>1||n.get(v).__currentAnisotropy)&&(i.texParameterf(E,ee.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy)}}function $(E,v){let B=!1;E.__webglInit===void 0&&(E.__webglInit=!0,v.addEventListener("dispose",w));const ee=v.source;let Q=f.get(ee);Q===void 0&&(Q={},f.set(ee,Q));const te=G(v);if(te!==E.__cacheKey){Q[te]===void 0&&(Q[te]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,B=!0),Q[te].usedTimes++;const me=Q[E.__cacheKey];me!==void 0&&(Q[E.__cacheKey].usedTimes--,me.usedTimes===0&&y(v)),E.__cacheKey=te,E.__webglTexture=Q[te].texture}return B}function he(E,v,B){let ee=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(ee=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(ee=i.TEXTURE_3D);const Q=$(E,v),te=v.source;t.bindTexture(ee,E.__webglTexture,i.TEXTURE0+B);const me=n.get(te);if(te.version!==me.__version||Q===!0){t.activeTexture(i.TEXTURE0+B);const ce=Ze.getPrimaries(Ze.workingColorSpace),de=v.colorSpace===Gt?null:Ze.getPrimaries(v.colorSpace),Te=v.colorSpace===Gt||ce===de?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const Oe=u(v)&&p(v.image)===!1;let J=_(v.image,Oe,!1,r.maxTextureSize);J=Ne(v,J);const qe=p(J)||a,Ve=s.convert(v.format,v.colorSpace);let Re=s.convert(v.type),xe=b(v.internalFormat,Ve,Re,v.colorSpace,v.isVideoTexture);k(ee,v,qe);let fe;const Ie=v.mipmaps,Xe=a&&v.isVideoTexture!==!0&&xe!==qo,nt=me.__version===void 0||Q===!0,ze=P(v,J,qe);if(v.isDepthTexture)xe=i.DEPTH_COMPONENT,a?v.type===Sn?xe=i.DEPTH_COMPONENT32F:v.type===xn?xe=i.DEPTH_COMPONENT24:v.type===zn?xe=i.DEPTH24_STENCIL8:xe=i.DEPTH_COMPONENT16:v.type===Sn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),v.format===Gn&&xe===i.DEPTH_COMPONENT&&v.type!==Hs&&v.type!==xn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),v.type=xn,Re=s.convert(v.type)),v.format===Si&&xe===i.DEPTH_COMPONENT&&(xe=i.DEPTH_STENCIL,v.type!==zn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),v.type=zn,Re=s.convert(v.type))),nt&&(Xe?t.texStorage2D(i.TEXTURE_2D,1,xe,J.width,J.height):t.texImage2D(i.TEXTURE_2D,0,xe,J.width,J.height,0,Ve,Re,null));else if(v.isDataTexture)if(Ie.length>0&&qe){Xe&&nt&&t.texStorage2D(i.TEXTURE_2D,ze,xe,Ie[0].width,Ie[0].height);for(let se=0,C=Ie.length;se<C;se++)fe=Ie[se],Xe?t.texSubImage2D(i.TEXTURE_2D,se,0,0,fe.width,fe.height,Ve,Re,fe.data):t.texImage2D(i.TEXTURE_2D,se,xe,fe.width,fe.height,0,Ve,Re,fe.data);v.generateMipmaps=!1}else Xe?(nt&&t.texStorage2D(i.TEXTURE_2D,ze,xe,J.width,J.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,J.width,J.height,Ve,Re,J.data)):t.texImage2D(i.TEXTURE_2D,0,xe,J.width,J.height,0,Ve,Re,J.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Xe&&nt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ze,xe,Ie[0].width,Ie[0].height,J.depth);for(let se=0,C=Ie.length;se<C;se++)fe=Ie[se],v.format!==Zt?Ve!==null?Xe?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,fe.width,fe.height,J.depth,Ve,fe.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,se,xe,fe.width,fe.height,J.depth,0,fe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?t.texSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,fe.width,fe.height,J.depth,Ve,Re,fe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,se,xe,fe.width,fe.height,J.depth,0,Ve,Re,fe.data)}else{Xe&&nt&&t.texStorage2D(i.TEXTURE_2D,ze,xe,Ie[0].width,Ie[0].height);for(let se=0,C=Ie.length;se<C;se++)fe=Ie[se],v.format!==Zt?Ve!==null?Xe?t.compressedTexSubImage2D(i.TEXTURE_2D,se,0,0,fe.width,fe.height,Ve,fe.data):t.compressedTexImage2D(i.TEXTURE_2D,se,xe,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?t.texSubImage2D(i.TEXTURE_2D,se,0,0,fe.width,fe.height,Ve,Re,fe.data):t.texImage2D(i.TEXTURE_2D,se,xe,fe.width,fe.height,0,Ve,Re,fe.data)}else if(v.isDataArrayTexture)Xe?(nt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ze,xe,J.width,J.height,J.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,Ve,Re,J.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,xe,J.width,J.height,J.depth,0,Ve,Re,J.data);else if(v.isData3DTexture)Xe?(nt&&t.texStorage3D(i.TEXTURE_3D,ze,xe,J.width,J.height,J.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,Ve,Re,J.data)):t.texImage3D(i.TEXTURE_3D,0,xe,J.width,J.height,J.depth,0,Ve,Re,J.data);else if(v.isFramebufferTexture){if(nt)if(Xe)t.texStorage2D(i.TEXTURE_2D,ze,xe,J.width,J.height);else{let se=J.width,C=J.height;for(let oe=0;oe<ze;oe++)t.texImage2D(i.TEXTURE_2D,oe,xe,se,C,0,Ve,Re,null),se>>=1,C>>=1}}else if(Ie.length>0&&qe){Xe&&nt&&t.texStorage2D(i.TEXTURE_2D,ze,xe,Ie[0].width,Ie[0].height);for(let se=0,C=Ie.length;se<C;se++)fe=Ie[se],Xe?t.texSubImage2D(i.TEXTURE_2D,se,0,0,Ve,Re,fe):t.texImage2D(i.TEXTURE_2D,se,xe,Ve,Re,fe);v.generateMipmaps=!1}else Xe?(nt&&t.texStorage2D(i.TEXTURE_2D,ze,xe,J.width,J.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ve,Re,J)):t.texImage2D(i.TEXTURE_2D,0,xe,Ve,Re,J);T(v,qe)&&M(ee),me.__version=te.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function ve(E,v,B){if(v.image.length!==6)return;const ee=$(E,v),Q=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+B);const te=n.get(Q);if(Q.version!==te.__version||ee===!0){t.activeTexture(i.TEXTURE0+B);const me=Ze.getPrimaries(Ze.workingColorSpace),ce=v.colorSpace===Gt?null:Ze.getPrimaries(v.colorSpace),de=v.colorSpace===Gt||me===ce?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const Te=v.isCompressedTexture||v.image[0].isCompressedTexture,Oe=v.image[0]&&v.image[0].isDataTexture,J=[];for(let se=0;se<6;se++)!Te&&!Oe?J[se]=_(v.image[se],!1,!0,r.maxCubemapSize):J[se]=Oe?v.image[se].image:v.image[se],J[se]=Ne(v,J[se]);const qe=J[0],Ve=p(qe)||a,Re=s.convert(v.format,v.colorSpace),xe=s.convert(v.type),fe=b(v.internalFormat,Re,xe,v.colorSpace),Ie=a&&v.isVideoTexture!==!0,Xe=te.__version===void 0||ee===!0;let nt=P(v,qe,Ve);k(i.TEXTURE_CUBE_MAP,v,Ve);let ze;if(Te){Ie&&Xe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,nt,fe,qe.width,qe.height);for(let se=0;se<6;se++){ze=J[se].mipmaps;for(let C=0;C<ze.length;C++){const oe=ze[C];v.format!==Zt?Re!==null?Ie?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,C,0,0,oe.width,oe.height,Re,oe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,C,fe,oe.width,oe.height,0,oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ie?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,C,0,0,oe.width,oe.height,Re,xe,oe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,C,fe,oe.width,oe.height,0,Re,xe,oe.data)}}}else{ze=v.mipmaps,Ie&&Xe&&(ze.length>0&&nt++,t.texStorage2D(i.TEXTURE_CUBE_MAP,nt,fe,J[0].width,J[0].height));for(let se=0;se<6;se++)if(Oe){Ie?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,J[se].width,J[se].height,Re,xe,J[se].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,fe,J[se].width,J[se].height,0,Re,xe,J[se].data);for(let C=0;C<ze.length;C++){const le=ze[C].image[se].image;Ie?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,C+1,0,0,le.width,le.height,Re,xe,le.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,C+1,fe,le.width,le.height,0,Re,xe,le.data)}}else{Ie?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Re,xe,J[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,fe,Re,xe,J[se]);for(let C=0;C<ze.length;C++){const oe=ze[C];Ie?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,C+1,0,0,Re,xe,oe.image[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,C+1,fe,Re,xe,oe.image[se])}}}T(v,Ve)&&M(i.TEXTURE_CUBE_MAP),te.__version=Q.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function _e(E,v,B,ee,Q,te){const me=s.convert(B.format,B.colorSpace),ce=s.convert(B.type),de=b(B.internalFormat,me,ce,B.colorSpace);if(!n.get(v).__hasExternalTextures){const Oe=Math.max(1,v.width>>te),J=Math.max(1,v.height>>te);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?t.texImage3D(Q,te,de,Oe,J,v.depth,0,me,ce,null):t.texImage2D(Q,te,de,Oe,J,0,me,ce,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),pe(v)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,Q,n.get(B).__webglTexture,0,Ce(v)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ee,Q,n.get(B).__webglTexture,te),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Le(E,v,B){if(i.bindRenderbuffer(i.RENDERBUFFER,E),v.depthBuffer&&!v.stencilBuffer){let ee=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(B||pe(v)){const Q=v.depthTexture;Q&&Q.isDepthTexture&&(Q.type===Sn?ee=i.DEPTH_COMPONENT32F:Q.type===xn&&(ee=i.DEPTH_COMPONENT24));const te=Ce(v);pe(v)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,te,ee,v.width,v.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,te,ee,v.width,v.height)}else i.renderbufferStorage(i.RENDERBUFFER,ee,v.width,v.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,E)}else if(v.depthBuffer&&v.stencilBuffer){const ee=Ce(v);B&&pe(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ee,i.DEPTH24_STENCIL8,v.width,v.height):pe(v)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ee,i.DEPTH24_STENCIL8,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,E)}else{const ee=v.isWebGLMultipleRenderTargets===!0?v.texture:[v.texture];for(let Q=0;Q<ee.length;Q++){const te=ee[Q],me=s.convert(te.format,te.colorSpace),ce=s.convert(te.type),de=b(te.internalFormat,me,ce,te.colorSpace),Te=Ce(v);B&&pe(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Te,de,v.width,v.height):pe(v)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Te,de,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,de,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ue(E,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),W(v.depthTexture,0);const ee=n.get(v.depthTexture).__webglTexture,Q=Ce(v);if(v.depthTexture.format===Gn)pe(v)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0);else if(v.depthTexture.format===Si)pe(v)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function be(E){const v=n.get(E),B=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!v.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");Ue(v.__webglFramebuffer,E)}else if(B){v.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[ee]),v.__webglDepthbuffer[ee]=i.createRenderbuffer(),Le(v.__webglDepthbuffer[ee],E,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer=i.createRenderbuffer(),Le(v.__webglDepthbuffer,E,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function We(E,v,B){const ee=n.get(E);v!==void 0&&_e(ee.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&be(E)}function N(E){const v=E.texture,B=n.get(E),ee=n.get(v);E.addEventListener("dispose",q),E.isWebGLMultipleRenderTargets!==!0&&(ee.__webglTexture===void 0&&(ee.__webglTexture=i.createTexture()),ee.__version=v.version,o.memory.textures++);const Q=E.isWebGLCubeRenderTarget===!0,te=E.isWebGLMultipleRenderTargets===!0,me=p(E)||a;if(Q){B.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(a&&v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer[ce]=[];for(let de=0;de<v.mipmaps.length;de++)B.__webglFramebuffer[ce][de]=i.createFramebuffer()}else B.__webglFramebuffer[ce]=i.createFramebuffer()}else{if(a&&v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer=[];for(let ce=0;ce<v.mipmaps.length;ce++)B.__webglFramebuffer[ce]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(te)if(r.drawBuffers){const ce=E.texture;for(let de=0,Te=ce.length;de<Te;de++){const Oe=n.get(ce[de]);Oe.__webglTexture===void 0&&(Oe.__webglTexture=i.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&E.samples>0&&pe(E)===!1){const ce=te?v:[v];B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let de=0;de<ce.length;de++){const Te=ce[de];B.__webglColorRenderbuffer[de]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[de]);const Oe=s.convert(Te.format,Te.colorSpace),J=s.convert(Te.type),qe=b(Te.internalFormat,Oe,J,Te.colorSpace,E.isXRRenderTarget===!0),Ve=Ce(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ve,qe,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,B.__webglColorRenderbuffer[de])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),Le(B.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Q){t.bindTexture(i.TEXTURE_CUBE_MAP,ee.__webglTexture),k(i.TEXTURE_CUBE_MAP,v,me);for(let ce=0;ce<6;ce++)if(a&&v.mipmaps&&v.mipmaps.length>0)for(let de=0;de<v.mipmaps.length;de++)_e(B.__webglFramebuffer[ce][de],E,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,de);else _e(B.__webglFramebuffer[ce],E,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);T(v,me)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(te){const ce=E.texture;for(let de=0,Te=ce.length;de<Te;de++){const Oe=ce[de],J=n.get(Oe);t.bindTexture(i.TEXTURE_2D,J.__webglTexture),k(i.TEXTURE_2D,Oe,me),_e(B.__webglFramebuffer,E,Oe,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,0),T(Oe,me)&&M(i.TEXTURE_2D)}t.unbindTexture()}else{let ce=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(a?ce=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ce,ee.__webglTexture),k(ce,v,me),a&&v.mipmaps&&v.mipmaps.length>0)for(let de=0;de<v.mipmaps.length;de++)_e(B.__webglFramebuffer[de],E,v,i.COLOR_ATTACHMENT0,ce,de);else _e(B.__webglFramebuffer,E,v,i.COLOR_ATTACHMENT0,ce,0);T(v,me)&&M(ce),t.unbindTexture()}E.depthBuffer&&be(E)}function St(E){const v=p(E)||a,B=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let ee=0,Q=B.length;ee<Q;ee++){const te=B[ee];if(T(te,v)){const me=E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,ce=n.get(te).__webglTexture;t.bindTexture(me,ce),M(me),t.unbindTexture()}}}function Me(E){if(a&&E.samples>0&&pe(E)===!1){const v=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],B=E.width,ee=E.height;let Q=i.COLOR_BUFFER_BIT;const te=[],me=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=n.get(E),de=E.isWebGLMultipleRenderTargets===!0;if(de)for(let Te=0;Te<v.length;Te++)t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let Te=0;Te<v.length;Te++){te.push(i.COLOR_ATTACHMENT0+Te),E.depthBuffer&&te.push(me);const Oe=ce.__ignoreDepthValues!==void 0?ce.__ignoreDepthValues:!1;if(Oe===!1&&(E.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),de&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ce.__webglColorRenderbuffer[Te]),Oe===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[me]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[me])),de){const J=n.get(v[Te]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,J,0)}i.blitFramebuffer(0,0,B,ee,0,0,B,ee,Q,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,te)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),de)for(let Te=0;Te<v.length;Te++){t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.RENDERBUFFER,ce.__webglColorRenderbuffer[Te]);const Oe=n.get(v[Te]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.TEXTURE_2D,Oe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}}function Ce(E){return Math.min(r.maxSamples,E.samples)}function pe(E){const v=n.get(E);return a&&E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function et(E){const v=o.render.frame;h.get(E)!==v&&(h.set(E,v),E.update())}function Ne(E,v){const B=E.colorSpace,ee=E.format,Q=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===Cs||B!==dn&&B!==Gt&&(Ze.getTransfer(B)===Je?a===!1?e.has("EXT_sRGB")===!0&&ee===Zt?(E.format=Cs,E.minFilter=Bt,E.generateMipmaps=!1):v=jo.sRGBToLinear(v):(ee!==Zt||Q!==yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),v}this.allocateTextureUnit=L,this.resetTextureUnits=ne,this.setTexture2D=W,this.setTexture2DArray=K,this.setTexture3D=Y,this.setTextureCube=Z,this.rebindTextures=We,this.setupRenderTarget=N,this.updateRenderTargetMipmap=St,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=pe}function qp(i,e,t){const n=t.isWebGL2;function r(s,o=Gt){let a;const l=Ze.getTransfer(o);if(s===yn)return i.UNSIGNED_BYTE;if(s===Ho)return i.UNSIGNED_SHORT_4_4_4_4;if(s===Vo)return i.UNSIGNED_SHORT_5_5_5_1;if(s===fc)return i.BYTE;if(s===pc)return i.SHORT;if(s===Hs)return i.UNSIGNED_SHORT;if(s===Go)return i.INT;if(s===xn)return i.UNSIGNED_INT;if(s===Sn)return i.FLOAT;if(s===Ni)return n?i.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===mc)return i.ALPHA;if(s===Zt)return i.RGBA;if(s===gc)return i.LUMINANCE;if(s===_c)return i.LUMINANCE_ALPHA;if(s===Gn)return i.DEPTH_COMPONENT;if(s===Si)return i.DEPTH_STENCIL;if(s===Cs)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===vc)return i.RED;if(s===ko)return i.RED_INTEGER;if(s===xc)return i.RG;if(s===Wo)return i.RG_INTEGER;if(s===Xo)return i.RGBA_INTEGER;if(s===kr||s===Wr||s===Xr||s===qr)if(l===Je)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===kr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Wr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Xr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===qr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===kr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Wr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Xr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===qr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===ca||s===ha||s===ua||s===da)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===ca)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===ha)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===ua)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===da)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===qo)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===fa||s===pa)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===fa)return l===Je?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===pa)return l===Je?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===ma||s===ga||s===_a||s===va||s===xa||s===Sa||s===Ma||s===Ea||s===ya||s===Ta||s===ba||s===wa||s===Aa||s===Ra)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===ma)return l===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===ga)return l===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===_a)return l===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===va)return l===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===xa)return l===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Sa)return l===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Ma)return l===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Ea)return l===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===ya)return l===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Ta)return l===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===ba)return l===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===wa)return l===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Aa)return l===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Ra)return l===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Yr||s===Ca||s===Pa)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===Yr)return l===Je?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Ca)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Pa)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Sc||s===La||s===Da||s===Ua)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===Yr)return a.COMPRESSED_RED_RGTC1_EXT;if(s===La)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Da)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Ua)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===zn?n?i.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[s]!==void 0?i[s]:null}return{convert:r}}class Yp extends zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Rt extends xt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Zp={type:"move"};class gs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Rt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Rt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Rt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),u=this._getHandJoint(c,_);p!==null&&(u.matrix.fromArray(p.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=p.radius),u.visible=p!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=h.position.distanceTo(d.position),m=.02,g=.005;c.inputState.pinching&&f>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Zp)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Rt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Kp extends Ei{constructor(e,t){super();const n=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,f=null,m=null,g=null;const _=t.getContextAttributes();let p=null,u=null;const T=[],M=[],b=new Se;let P=null;const A=new zt;A.layers.enable(1),A.viewport=new mt;const w=new zt;w.layers.enable(2),w.viewport=new mt;const q=[A,w],x=new Yp;x.layers.enable(1),x.layers.enable(2);let y=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let $=T[k];return $===void 0&&($=new gs,T[k]=$),$.getTargetRaySpace()},this.getControllerGrip=function(k){let $=T[k];return $===void 0&&($=new gs,T[k]=$),$.getGripSpace()},this.getHand=function(k){let $=T[k];return $===void 0&&($=new gs,T[k]=$),$.getHandSpace()};function X(k){const $=M.indexOf(k.inputSource);if($===-1)return;const he=T[$];he!==void 0&&(he.update(k.inputSource,k.frame,c||o),he.dispatchEvent({type:k.type,data:k.inputSource}))}function ne(){r.removeEventListener("select",X),r.removeEventListener("selectstart",X),r.removeEventListener("selectend",X),r.removeEventListener("squeeze",X),r.removeEventListener("squeezestart",X),r.removeEventListener("squeezeend",X),r.removeEventListener("end",ne),r.removeEventListener("inputsourceschange",L);for(let k=0;k<T.length;k++){const $=M[k];$!==null&&(M[k]=null,T[k].disconnect($))}y=null,V=null,e.setRenderTarget(p),m=null,f=null,d=null,r=null,u=null,re.stop(),n.isPresenting=!1,e.setPixelRatio(P),e.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){s=k,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){a=k,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(k){c=k},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(k){if(r=k,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",X),r.addEventListener("selectstart",X),r.addEventListener("selectend",X),r.addEventListener("squeeze",X),r.addEventListener("squeezestart",X),r.addEventListener("squeezeend",X),r.addEventListener("end",ne),r.addEventListener("inputsourceschange",L),_.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(b),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const $={antialias:r.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,$),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),u=new Vn(m.framebufferWidth,m.framebufferHeight,{format:Zt,type:yn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let $=null,he=null,ve=null;_.depth&&(ve=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,$=_.stencil?Si:Gn,he=_.stencil?zn:xn);const _e={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:s};d=new XRWebGLBinding(r,t),f=d.createProjectionLayer(_e),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),u=new Vn(f.textureWidth,f.textureHeight,{format:Zt,type:yn,depthTexture:new cl(f.textureWidth,f.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Le=e.properties.get(u);Le.__ignoreDepthValues=f.ignoreDepthValues}u.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),re.setContext(r),re.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function L(k){for(let $=0;$<k.removed.length;$++){const he=k.removed[$],ve=M.indexOf(he);ve>=0&&(M[ve]=null,T[ve].disconnect(he))}for(let $=0;$<k.added.length;$++){const he=k.added[$];let ve=M.indexOf(he);if(ve===-1){for(let Le=0;Le<T.length;Le++)if(Le>=M.length){M.push(he),ve=Le;break}else if(M[Le]===null){M[Le]=he,ve=Le;break}if(ve===-1)break}const _e=T[ve];_e&&_e.connect(he)}}const G=new R,W=new R;function K(k,$,he){G.setFromMatrixPosition($.matrixWorld),W.setFromMatrixPosition(he.matrixWorld);const ve=G.distanceTo(W),_e=$.projectionMatrix.elements,Le=he.projectionMatrix.elements,Ue=_e[14]/(_e[10]-1),be=_e[14]/(_e[10]+1),We=(_e[9]+1)/_e[5],N=(_e[9]-1)/_e[5],St=(_e[8]-1)/_e[0],Me=(Le[8]+1)/Le[0],Ce=Ue*St,pe=Ue*Me,et=ve/(-St+Me),Ne=et*-St;$.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(Ne),k.translateZ(et),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert();const E=Ue+et,v=be+et,B=Ce-Ne,ee=pe+(ve-Ne),Q=We*be/v*E,te=N*be/v*E;k.projectionMatrix.makePerspective(B,ee,Q,te,E,v),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}function Y(k,$){$===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices($.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(r===null)return;x.near=w.near=A.near=k.near,x.far=w.far=A.far=k.far,(y!==x.near||V!==x.far)&&(r.updateRenderState({depthNear:x.near,depthFar:x.far}),y=x.near,V=x.far);const $=k.parent,he=x.cameras;Y(x,$);for(let ve=0;ve<he.length;ve++)Y(he[ve],$);he.length===2?K(x,A,w):x.projectionMatrix.copy(A.projectionMatrix),Z(k,x,$)};function Z(k,$,he){he===null?k.matrix.copy($.matrixWorld):(k.matrix.copy(he.matrixWorld),k.matrix.invert(),k.matrix.multiply($.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy($.projectionMatrix),k.projectionMatrixInverse.copy($.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=Oi*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function(k){l=k,f!==null&&(f.fixedFoveation=k),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=k)};let j=null;function ie(k,$){if(h=$.getViewerPose(c||o),g=$,h!==null){const he=h.views;m!==null&&(e.setRenderTargetFramebuffer(u,m.framebuffer),e.setRenderTarget(u));let ve=!1;he.length!==x.cameras.length&&(x.cameras.length=0,ve=!0);for(let _e=0;_e<he.length;_e++){const Le=he[_e];let Ue=null;if(m!==null)Ue=m.getViewport(Le);else{const We=d.getViewSubImage(f,Le);Ue=We.viewport,_e===0&&(e.setRenderTargetTextures(u,We.colorTexture,f.ignoreDepthValues?void 0:We.depthStencilTexture),e.setRenderTarget(u))}let be=q[_e];be===void 0&&(be=new zt,be.layers.enable(_e),be.viewport=new mt,q[_e]=be),be.matrix.fromArray(Le.transform.matrix),be.matrix.decompose(be.position,be.quaternion,be.scale),be.projectionMatrix.fromArray(Le.projectionMatrix),be.projectionMatrixInverse.copy(be.projectionMatrix).invert(),be.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),_e===0&&(x.matrix.copy(be.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ve===!0&&x.cameras.push(be)}}for(let he=0;he<T.length;he++){const ve=M[he],_e=T[he];ve!==null&&_e!==void 0&&_e.update(ve,$,c||o)}j&&j(k,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),g=null}const re=new ol;re.setAnimationLoop(ie),this.setAnimationLoop=function(k){j=k},this.dispose=function(){}}}function jp(i,e){function t(p,u){p.matrixAutoUpdate===!0&&p.updateMatrix(),u.value.copy(p.matrix)}function n(p,u){u.color.getRGB(p.fogColor.value,il(i)),u.isFog?(p.fogNear.value=u.near,p.fogFar.value=u.far):u.isFogExp2&&(p.fogDensity.value=u.density)}function r(p,u,T,M,b){u.isMeshBasicMaterial||u.isMeshLambertMaterial?s(p,u):u.isMeshToonMaterial?(s(p,u),d(p,u)):u.isMeshPhongMaterial?(s(p,u),h(p,u)):u.isMeshStandardMaterial?(s(p,u),f(p,u),u.isMeshPhysicalMaterial&&m(p,u,b)):u.isMeshMatcapMaterial?(s(p,u),g(p,u)):u.isMeshDepthMaterial?s(p,u):u.isMeshDistanceMaterial?(s(p,u),_(p,u)):u.isMeshNormalMaterial?s(p,u):u.isLineBasicMaterial?(o(p,u),u.isLineDashedMaterial&&a(p,u)):u.isPointsMaterial?l(p,u,T,M):u.isSpriteMaterial?c(p,u):u.isShadowMaterial?(p.color.value.copy(u.color),p.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(p,u){p.opacity.value=u.opacity,u.color&&p.diffuse.value.copy(u.color),u.emissive&&p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(p.map.value=u.map,t(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.bumpMap&&(p.bumpMap.value=u.bumpMap,t(u.bumpMap,p.bumpMapTransform),p.bumpScale.value=u.bumpScale,u.side===Pt&&(p.bumpScale.value*=-1)),u.normalMap&&(p.normalMap.value=u.normalMap,t(u.normalMap,p.normalMapTransform),p.normalScale.value.copy(u.normalScale),u.side===Pt&&p.normalScale.value.negate()),u.displacementMap&&(p.displacementMap.value=u.displacementMap,t(u.displacementMap,p.displacementMapTransform),p.displacementScale.value=u.displacementScale,p.displacementBias.value=u.displacementBias),u.emissiveMap&&(p.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,p.emissiveMapTransform)),u.specularMap&&(p.specularMap.value=u.specularMap,t(u.specularMap,p.specularMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest);const T=e.get(u).envMap;if(T&&(p.envMap.value=T,p.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=u.reflectivity,p.ior.value=u.ior,p.refractionRatio.value=u.refractionRatio),u.lightMap){p.lightMap.value=u.lightMap;const M=i._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=u.lightMapIntensity*M,t(u.lightMap,p.lightMapTransform)}u.aoMap&&(p.aoMap.value=u.aoMap,p.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,p.aoMapTransform))}function o(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,u.map&&(p.map.value=u.map,t(u.map,p.mapTransform))}function a(p,u){p.dashSize.value=u.dashSize,p.totalSize.value=u.dashSize+u.gapSize,p.scale.value=u.scale}function l(p,u,T,M){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.size.value=u.size*T,p.scale.value=M*.5,u.map&&(p.map.value=u.map,t(u.map,p.uvTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function c(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.rotation.value=u.rotation,u.map&&(p.map.value=u.map,t(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function h(p,u){p.specular.value.copy(u.specular),p.shininess.value=Math.max(u.shininess,1e-4)}function d(p,u){u.gradientMap&&(p.gradientMap.value=u.gradientMap)}function f(p,u){p.metalness.value=u.metalness,u.metalnessMap&&(p.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,p.metalnessMapTransform)),p.roughness.value=u.roughness,u.roughnessMap&&(p.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,p.roughnessMapTransform)),e.get(u).envMap&&(p.envMapIntensity.value=u.envMapIntensity)}function m(p,u,T){p.ior.value=u.ior,u.sheen>0&&(p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),p.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(p.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,p.sheenColorMapTransform)),u.sheenRoughnessMap&&(p.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,p.sheenRoughnessMapTransform))),u.clearcoat>0&&(p.clearcoat.value=u.clearcoat,p.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(p.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,p.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(p.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Pt&&p.clearcoatNormalScale.value.negate())),u.iridescence>0&&(p.iridescence.value=u.iridescence,p.iridescenceIOR.value=u.iridescenceIOR,p.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(p.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,p.iridescenceMapTransform)),u.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),u.transmission>0&&(p.transmission.value=u.transmission,p.transmissionSamplerMap.value=T.texture,p.transmissionSamplerSize.value.set(T.width,T.height),u.transmissionMap&&(p.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,p.transmissionMapTransform)),p.thickness.value=u.thickness,u.thicknessMap&&(p.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=u.attenuationDistance,p.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(p.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(p.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=u.specularIntensity,p.specularColor.value.copy(u.specularColor),u.specularColorMap&&(p.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,p.specularColorMapTransform)),u.specularIntensityMap&&(p.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,u){u.matcap&&(p.matcap.value=u.matcap)}function _(p,u){const T=e.get(u).light;p.referencePosition.value.setFromMatrixPosition(T.matrixWorld),p.nearDistance.value=T.shadow.camera.near,p.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function $p(i,e,t,n){let r={},s={},o=[];const a=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(T,M){const b=M.program;n.uniformBlockBinding(T,b)}function c(T,M){let b=r[T.id];b===void 0&&(g(T),b=h(T),r[T.id]=b,T.addEventListener("dispose",p));const P=M.program;n.updateUBOMapping(T,P);const A=e.render.frame;s[T.id]!==A&&(f(T),s[T.id]=A)}function h(T){const M=d();T.__bindingPointIndex=M;const b=i.createBuffer(),P=T.__size,A=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,P,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,b),b}function d(){for(let T=0;T<a;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(T){const M=r[T.id],b=T.uniforms,P=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let A=0,w=b.length;A<w;A++){const q=Array.isArray(b[A])?b[A]:[b[A]];for(let x=0,y=q.length;x<y;x++){const V=q[x];if(m(V,A,x,P)===!0){const X=V.__offset,ne=Array.isArray(V.value)?V.value:[V.value];let L=0;for(let G=0;G<ne.length;G++){const W=ne[G],K=_(W);typeof W=="number"||typeof W=="boolean"?(V.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,X+L,V.__data)):W.isMatrix3?(V.__data[0]=W.elements[0],V.__data[1]=W.elements[1],V.__data[2]=W.elements[2],V.__data[3]=0,V.__data[4]=W.elements[3],V.__data[5]=W.elements[4],V.__data[6]=W.elements[5],V.__data[7]=0,V.__data[8]=W.elements[6],V.__data[9]=W.elements[7],V.__data[10]=W.elements[8],V.__data[11]=0):(W.toArray(V.__data,L),L+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,X,V.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(T,M,b,P){const A=T.value,w=M+"_"+b;if(P[w]===void 0)return typeof A=="number"||typeof A=="boolean"?P[w]=A:P[w]=A.clone(),!0;{const q=P[w];if(typeof A=="number"||typeof A=="boolean"){if(q!==A)return P[w]=A,!0}else if(q.equals(A)===!1)return q.copy(A),!0}return!1}function g(T){const M=T.uniforms;let b=0;const P=16;for(let w=0,q=M.length;w<q;w++){const x=Array.isArray(M[w])?M[w]:[M[w]];for(let y=0,V=x.length;y<V;y++){const X=x[y],ne=Array.isArray(X.value)?X.value:[X.value];for(let L=0,G=ne.length;L<G;L++){const W=ne[L],K=_(W),Y=b%P;Y!==0&&P-Y<K.boundary&&(b+=P-Y),X.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=b,b+=K.storage}}}const A=b%P;return A>0&&(b+=P-A),T.__size=b,T.__cache={},this}function _(T){const M={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(M.boundary=4,M.storage=4):T.isVector2?(M.boundary=8,M.storage=8):T.isVector3||T.isColor?(M.boundary=16,M.storage=12):T.isVector4?(M.boundary=16,M.storage=16):T.isMatrix3?(M.boundary=48,M.storage=48):T.isMatrix4?(M.boundary=64,M.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),M}function p(T){const M=T.target;M.removeEventListener("dispose",p);const b=o.indexOf(M.__bindingPointIndex);o.splice(b,1),i.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function u(){for(const T in r)i.deleteBuffer(r[T]);o=[],r={},s={}}return{bind:l,update:c,dispose:u}}class ml{constructor(e={}){const{canvas:t=qc(),context:n=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=o;const m=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const u=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=pt,this._useLegacyLights=!1,this.toneMapping=En,this.toneMappingExposure=1;const M=this;let b=!1,P=0,A=0,w=null,q=-1,x=null;const y=new mt,V=new mt;let X=null;const ne=new ke(0);let L=0,G=t.width,W=t.height,K=1,Y=null,Z=null;const j=new mt(0,0,G,W),ie=new mt(0,0,G,W);let re=!1;const k=new al;let $=!1,he=!1,ve=null;const _e=new at,Le=new Se,Ue=new R,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function We(){return w===null?K:1}let N=n;function St(S,F){for(let z=0;z<S.length;z++){const H=S[z],O=t.getContext(H,F);if(O!==null)return O}return null}try{const S={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Gs}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",C,!1),t.addEventListener("webglcontextcreationerror",oe,!1),N===null){const F=["webgl2","webgl","experimental-webgl"];if(M.isWebGL1Renderer===!0&&F.shift(),N=St(F,S),N===null)throw St(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&N instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),N.getShaderPrecisionFormat===void 0&&(N.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Me,Ce,pe,et,Ne,E,v,B,ee,Q,te,me,ce,de,Te,Oe,J,qe,Ve,Re,xe,fe,Ie,Xe;function nt(){Me=new of(N),Ce=new ef(N,Me,e),Me.init(Ce),fe=new qp(N,Me,Ce),pe=new Wp(N,Me,Ce),et=new hf(N),Ne=new Pp,E=new Xp(N,Me,pe,Ne,Ce,fe,et),v=new nf(M),B=new af(M),ee=new _h(N,Ce),Ie=new Jd(N,Me,ee,Ce),Q=new lf(N,ee,et,Ie),te=new pf(N,Q,ee,et),Ve=new ff(N,Ce,E),Oe=new tf(Ne),me=new Cp(M,v,B,Me,Ce,Ie,Oe),ce=new jp(M,Ne),de=new Dp,Te=new Bp(Me,Ce),qe=new $d(M,v,B,pe,te,f,l),J=new kp(M,te,Ce),Xe=new $p(N,et,Ce,pe),Re=new Qd(N,Me,et,Ce),xe=new cf(N,Me,et,Ce),et.programs=me.programs,M.capabilities=Ce,M.extensions=Me,M.properties=Ne,M.renderLists=de,M.shadowMap=J,M.state=pe,M.info=et}nt();const ze=new Kp(M,N);this.xr=ze,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const S=Me.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Me.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(S){S!==void 0&&(K=S,this.setSize(G,W,!1))},this.getSize=function(S){return S.set(G,W)},this.setSize=function(S,F,z=!0){if(ze.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=S,W=F,t.width=Math.floor(S*K),t.height=Math.floor(F*K),z===!0&&(t.style.width=S+"px",t.style.height=F+"px"),this.setViewport(0,0,S,F)},this.getDrawingBufferSize=function(S){return S.set(G*K,W*K).floor()},this.setDrawingBufferSize=function(S,F,z){G=S,W=F,K=z,t.width=Math.floor(S*z),t.height=Math.floor(F*z),this.setViewport(0,0,S,F)},this.getCurrentViewport=function(S){return S.copy(y)},this.getViewport=function(S){return S.copy(j)},this.setViewport=function(S,F,z,H){S.isVector4?j.set(S.x,S.y,S.z,S.w):j.set(S,F,z,H),pe.viewport(y.copy(j).multiplyScalar(K).floor())},this.getScissor=function(S){return S.copy(ie)},this.setScissor=function(S,F,z,H){S.isVector4?ie.set(S.x,S.y,S.z,S.w):ie.set(S,F,z,H),pe.scissor(V.copy(ie).multiplyScalar(K).floor())},this.getScissorTest=function(){return re},this.setScissorTest=function(S){pe.setScissorTest(re=S)},this.setOpaqueSort=function(S){Y=S},this.setTransparentSort=function(S){Z=S},this.getClearColor=function(S){return S.copy(qe.getClearColor())},this.setClearColor=function(){qe.setClearColor.apply(qe,arguments)},this.getClearAlpha=function(){return qe.getClearAlpha()},this.setClearAlpha=function(){qe.setClearAlpha.apply(qe,arguments)},this.clear=function(S=!0,F=!0,z=!0){let H=0;if(S){let O=!1;if(w!==null){const ue=w.texture.format;O=ue===Xo||ue===Wo||ue===ko}if(O){const ue=w.texture.type,ge=ue===yn||ue===xn||ue===Hs||ue===zn||ue===Ho||ue===Vo,ye=qe.getClearColor(),Ae=qe.getClearAlpha(),Be=ye.r,Pe=ye.g,De=ye.b;ge?(m[0]=Be,m[1]=Pe,m[2]=De,m[3]=Ae,N.clearBufferuiv(N.COLOR,0,m)):(g[0]=Be,g[1]=Pe,g[2]=De,g[3]=Ae,N.clearBufferiv(N.COLOR,0,g))}else H|=N.COLOR_BUFFER_BIT}F&&(H|=N.DEPTH_BUFFER_BIT),z&&(H|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",C,!1),t.removeEventListener("webglcontextcreationerror",oe,!1),de.dispose(),Te.dispose(),Ne.dispose(),v.dispose(),B.dispose(),te.dispose(),Ie.dispose(),Xe.dispose(),me.dispose(),ze.dispose(),ze.removeEventListener("sessionstart",Mt),ze.removeEventListener("sessionend",$e),ve&&(ve.dispose(),ve=null),Et.stop()};function se(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function C(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const S=et.autoReset,F=J.enabled,z=J.autoUpdate,H=J.needsUpdate,O=J.type;nt(),et.autoReset=S,J.enabled=F,J.autoUpdate=z,J.needsUpdate=H,J.type=O}function oe(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function le(S){const F=S.target;F.removeEventListener("dispose",le),we(F)}function we(S){Ee(S),Ne.remove(S)}function Ee(S){const F=Ne.get(S).programs;F!==void 0&&(F.forEach(function(z){me.releaseProgram(z)}),S.isShaderMaterial&&me.releaseShaderCache(S))}this.renderBufferDirect=function(S,F,z,H,O,ue){F===null&&(F=be);const ge=O.isMesh&&O.matrixWorld.determinant()<0,ye=wl(S,F,z,H,O);pe.setMaterial(H,ge);let Ae=z.index,Be=1;if(H.wireframe===!0){if(Ae=Q.getWireframeAttribute(z),Ae===void 0)return;Be=2}const Pe=z.drawRange,De=z.attributes.position;let st=Pe.start*Be,Dt=(Pe.start+Pe.count)*Be;ue!==null&&(st=Math.max(st,ue.start*Be),Dt=Math.min(Dt,(ue.start+ue.count)*Be)),Ae!==null?(st=Math.max(st,0),Dt=Math.min(Dt,Ae.count)):De!=null&&(st=Math.max(st,0),Dt=Math.min(Dt,De.count));const dt=Dt-st;if(dt<0||dt===1/0)return;Ie.setup(O,H,ye,z,Ae);let en,tt=Re;if(Ae!==null&&(en=ee.get(Ae),tt=xe,tt.setIndex(en)),O.isMesh)H.wireframe===!0?(pe.setLineWidth(H.wireframeLinewidth*We()),tt.setMode(N.LINES)):tt.setMode(N.TRIANGLES);else if(O.isLine){let Ge=H.linewidth;Ge===void 0&&(Ge=1),pe.setLineWidth(Ge*We()),O.isLineSegments?tt.setMode(N.LINES):O.isLineLoop?tt.setMode(N.LINE_LOOP):tt.setMode(N.LINE_STRIP)}else O.isPoints?tt.setMode(N.POINTS):O.isSprite&&tt.setMode(N.TRIANGLES);if(O.isBatchedMesh)tt.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else if(O.isInstancedMesh)tt.renderInstances(st,dt,O.count);else if(z.isInstancedBufferGeometry){const Ge=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,Br=Math.min(z.instanceCount,Ge);tt.renderInstances(st,dt,Br)}else tt.render(st,dt)};function Ke(S,F,z){S.transparent===!0&&S.side===ln&&S.forceSinglePass===!1?(S.side=Pt,S.needsUpdate=!0,Wi(S,F,z),S.side=bn,S.needsUpdate=!0,Wi(S,F,z),S.side=ln):Wi(S,F,z)}this.compile=function(S,F,z=null){z===null&&(z=S),p=Te.get(z),p.init(),T.push(p),z.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),S!==z&&S.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights(M._useLegacyLights);const H=new Set;return S.traverse(function(O){const ue=O.material;if(ue)if(Array.isArray(ue))for(let ge=0;ge<ue.length;ge++){const ye=ue[ge];Ke(ye,z,O),H.add(ye)}else Ke(ue,z,O),H.add(ue)}),T.pop(),p=null,H},this.compileAsync=function(S,F,z=null){const H=this.compile(S,F,z);return new Promise(O=>{function ue(){if(H.forEach(function(ge){Ne.get(ge).currentProgram.isReady()&&H.delete(ge)}),H.size===0){O(S);return}setTimeout(ue,10)}Me.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let je=null;function ut(S){je&&je(S)}function Mt(){Et.stop()}function $e(){Et.start()}const Et=new ol;Et.setAnimationLoop(ut),typeof self<"u"&&Et.setContext(self),this.setAnimationLoop=function(S){je=S,ze.setAnimationLoop(S),S===null?Et.stop():Et.start()},ze.addEventListener("sessionstart",Mt),ze.addEventListener("sessionend",$e),this.render=function(S,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ze.enabled===!0&&ze.isPresenting===!0&&(ze.cameraAutoUpdate===!0&&ze.updateCamera(F),F=ze.getCamera()),S.isScene===!0&&S.onBeforeRender(M,S,F,w),p=Te.get(S,T.length),p.init(),T.push(p),_e.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),k.setFromProjectionMatrix(_e),he=this.localClippingEnabled,$=Oe.init(this.clippingPlanes,he),_=de.get(S,u.length),_.init(),u.push(_),$t(S,F,0,M.sortObjects),_.finish(),M.sortObjects===!0&&_.sort(Y,Z),this.info.render.frame++,$===!0&&Oe.beginShadows();const z=p.state.shadowsArray;if(J.render(z,S,F),$===!0&&Oe.endShadows(),this.info.autoReset===!0&&this.info.reset(),qe.render(_,S),p.setupLights(M._useLegacyLights),F.isArrayCamera){const H=F.cameras;for(let O=0,ue=H.length;O<ue;O++){const ge=H[O];$s(_,S,ge,ge.viewport)}}else $s(_,S,F);w!==null&&(E.updateMultisampleRenderTarget(w),E.updateRenderTargetMipmap(w)),S.isScene===!0&&S.onAfterRender(M,S,F),Ie.resetDefaultState(),q=-1,x=null,T.pop(),T.length>0?p=T[T.length-1]:p=null,u.pop(),u.length>0?_=u[u.length-1]:_=null};function $t(S,F,z,H){if(S.visible===!1)return;if(S.layers.test(F.layers)){if(S.isGroup)z=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(F);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||k.intersectsSprite(S)){H&&Ue.setFromMatrixPosition(S.matrixWorld).applyMatrix4(_e);const ge=te.update(S),ye=S.material;ye.visible&&_.push(S,ge,ye,z,Ue.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||k.intersectsObject(S))){const ge=te.update(S),ye=S.material;if(H&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ue.copy(S.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),Ue.copy(ge.boundingSphere.center)),Ue.applyMatrix4(S.matrixWorld).applyMatrix4(_e)),Array.isArray(ye)){const Ae=ge.groups;for(let Be=0,Pe=Ae.length;Be<Pe;Be++){const De=Ae[Be],st=ye[De.materialIndex];st&&st.visible&&_.push(S,ge,st,z,Ue.z,De)}}else ye.visible&&_.push(S,ge,ye,z,Ue.z,null)}}const ue=S.children;for(let ge=0,ye=ue.length;ge<ye;ge++)$t(ue[ge],F,z,H)}function $s(S,F,z,H){const O=S.opaque,ue=S.transmissive,ge=S.transparent;p.setupLightsView(z),$===!0&&Oe.setGlobalState(M.clippingPlanes,z),ue.length>0&&bl(O,ue,F,z),H&&pe.viewport(y.copy(H)),O.length>0&&ki(O,F,z),ue.length>0&&ki(ue,F,z),ge.length>0&&ki(ge,F,z),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1)}function bl(S,F,z,H){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;const ue=Ce.isWebGL2;ve===null&&(ve=new Vn(1,1,{generateMipmaps:!0,type:Me.has("EXT_color_buffer_half_float")?Ni:yn,minFilter:Fi,samples:ue?4:0})),M.getDrawingBufferSize(Le),ue?ve.setSize(Le.x,Le.y):ve.setSize(Pr(Le.x),Pr(Le.y));const ge=M.getRenderTarget();M.setRenderTarget(ve),M.getClearColor(ne),L=M.getClearAlpha(),L<1&&M.setClearColor(16777215,.5),M.clear();const ye=M.toneMapping;M.toneMapping=En,ki(S,z,H),E.updateMultisampleRenderTarget(ve),E.updateRenderTargetMipmap(ve);let Ae=!1;for(let Be=0,Pe=F.length;Be<Pe;Be++){const De=F[Be],st=De.object,Dt=De.geometry,dt=De.material,en=De.group;if(dt.side===ln&&st.layers.test(H.layers)){const tt=dt.side;dt.side=Pt,dt.needsUpdate=!0,Js(st,z,H,Dt,dt,en),dt.side=tt,dt.needsUpdate=!0,Ae=!0}}Ae===!0&&(E.updateMultisampleRenderTarget(ve),E.updateRenderTargetMipmap(ve)),M.setRenderTarget(ge),M.setClearColor(ne,L),M.toneMapping=ye}function ki(S,F,z){const H=F.isScene===!0?F.overrideMaterial:null;for(let O=0,ue=S.length;O<ue;O++){const ge=S[O],ye=ge.object,Ae=ge.geometry,Be=H===null?ge.material:H,Pe=ge.group;ye.layers.test(z.layers)&&Js(ye,F,z,Ae,Be,Pe)}}function Js(S,F,z,H,O,ue){S.onBeforeRender(M,F,z,H,O,ue),S.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),O.onBeforeRender(M,F,z,H,S,ue),O.transparent===!0&&O.side===ln&&O.forceSinglePass===!1?(O.side=Pt,O.needsUpdate=!0,M.renderBufferDirect(z,F,H,O,S,ue),O.side=bn,O.needsUpdate=!0,M.renderBufferDirect(z,F,H,O,S,ue),O.side=ln):M.renderBufferDirect(z,F,H,O,S,ue),S.onAfterRender(M,F,z,H,O,ue)}function Wi(S,F,z){F.isScene!==!0&&(F=be);const H=Ne.get(S),O=p.state.lights,ue=p.state.shadowsArray,ge=O.state.version,ye=me.getParameters(S,O.state,ue,F,z),Ae=me.getProgramCacheKey(ye);let Be=H.programs;H.environment=S.isMeshStandardMaterial?F.environment:null,H.fog=F.fog,H.envMap=(S.isMeshStandardMaterial?B:v).get(S.envMap||H.environment),Be===void 0&&(S.addEventListener("dispose",le),Be=new Map,H.programs=Be);let Pe=Be.get(Ae);if(Pe!==void 0){if(H.currentProgram===Pe&&H.lightsStateVersion===ge)return ea(S,ye),Pe}else ye.uniforms=me.getUniforms(S),S.onBuild(z,ye,M),S.onBeforeCompile(ye,M),Pe=me.acquireProgram(ye,Ae),Be.set(Ae,Pe),H.uniforms=ye.uniforms;const De=H.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(De.clippingPlanes=Oe.uniform),ea(S,ye),H.needsLights=Rl(S),H.lightsStateVersion=ge,H.needsLights&&(De.ambientLightColor.value=O.state.ambient,De.lightProbe.value=O.state.probe,De.directionalLights.value=O.state.directional,De.directionalLightShadows.value=O.state.directionalShadow,De.spotLights.value=O.state.spot,De.spotLightShadows.value=O.state.spotShadow,De.rectAreaLights.value=O.state.rectArea,De.ltc_1.value=O.state.rectAreaLTC1,De.ltc_2.value=O.state.rectAreaLTC2,De.pointLights.value=O.state.point,De.pointLightShadows.value=O.state.pointShadow,De.hemisphereLights.value=O.state.hemi,De.directionalShadowMap.value=O.state.directionalShadowMap,De.directionalShadowMatrix.value=O.state.directionalShadowMatrix,De.spotShadowMap.value=O.state.spotShadowMap,De.spotLightMatrix.value=O.state.spotLightMatrix,De.spotLightMap.value=O.state.spotLightMap,De.pointShadowMap.value=O.state.pointShadowMap,De.pointShadowMatrix.value=O.state.pointShadowMatrix),H.currentProgram=Pe,H.uniformsList=null,Pe}function Qs(S){if(S.uniformsList===null){const F=S.currentProgram.getUniforms();S.uniformsList=Er.seqWithValue(F.seq,S.uniforms)}return S.uniformsList}function ea(S,F){const z=Ne.get(S);z.outputColorSpace=F.outputColorSpace,z.batching=F.batching,z.instancing=F.instancing,z.instancingColor=F.instancingColor,z.skinning=F.skinning,z.morphTargets=F.morphTargets,z.morphNormals=F.morphNormals,z.morphColors=F.morphColors,z.morphTargetsCount=F.morphTargetsCount,z.numClippingPlanes=F.numClippingPlanes,z.numIntersection=F.numClipIntersection,z.vertexAlphas=F.vertexAlphas,z.vertexTangents=F.vertexTangents,z.toneMapping=F.toneMapping}function wl(S,F,z,H,O){F.isScene!==!0&&(F=be),E.resetTextureUnits();const ue=F.fog,ge=H.isMeshStandardMaterial?F.environment:null,ye=w===null?M.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:dn,Ae=(H.isMeshStandardMaterial?B:v).get(H.envMap||ge),Be=H.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Pe=!!z.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),De=!!z.morphAttributes.position,st=!!z.morphAttributes.normal,Dt=!!z.morphAttributes.color;let dt=En;H.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(dt=M.toneMapping);const en=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,tt=en!==void 0?en.length:0,Ge=Ne.get(H),Br=p.state.lights;if($===!0&&(he===!0||S!==x)){const Nt=S===x&&H.id===q;Oe.setState(H,S,Nt)}let it=!1;H.version===Ge.__version?(Ge.needsLights&&Ge.lightsStateVersion!==Br.state.version||Ge.outputColorSpace!==ye||O.isBatchedMesh&&Ge.batching===!1||!O.isBatchedMesh&&Ge.batching===!0||O.isInstancedMesh&&Ge.instancing===!1||!O.isInstancedMesh&&Ge.instancing===!0||O.isSkinnedMesh&&Ge.skinning===!1||!O.isSkinnedMesh&&Ge.skinning===!0||O.isInstancedMesh&&Ge.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ge.instancingColor===!1&&O.instanceColor!==null||Ge.envMap!==Ae||H.fog===!0&&Ge.fog!==ue||Ge.numClippingPlanes!==void 0&&(Ge.numClippingPlanes!==Oe.numPlanes||Ge.numIntersection!==Oe.numIntersection)||Ge.vertexAlphas!==Be||Ge.vertexTangents!==Pe||Ge.morphTargets!==De||Ge.morphNormals!==st||Ge.morphColors!==Dt||Ge.toneMapping!==dt||Ce.isWebGL2===!0&&Ge.morphTargetsCount!==tt)&&(it=!0):(it=!0,Ge.__version=H.version);let An=Ge.currentProgram;it===!0&&(An=Wi(H,F,O));let ta=!1,Ti=!1,zr=!1;const gt=An.getUniforms(),Rn=Ge.uniforms;if(pe.useProgram(An.program)&&(ta=!0,Ti=!0,zr=!0),H.id!==q&&(q=H.id,Ti=!0),ta||x!==S){gt.setValue(N,"projectionMatrix",S.projectionMatrix),gt.setValue(N,"viewMatrix",S.matrixWorldInverse);const Nt=gt.map.cameraPosition;Nt!==void 0&&Nt.setValue(N,Ue.setFromMatrixPosition(S.matrixWorld)),Ce.logarithmicDepthBuffer&&gt.setValue(N,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&gt.setValue(N,"isOrthographic",S.isOrthographicCamera===!0),x!==S&&(x=S,Ti=!0,zr=!0)}if(O.isSkinnedMesh){gt.setOptional(N,O,"bindMatrix"),gt.setOptional(N,O,"bindMatrixInverse");const Nt=O.skeleton;Nt&&(Ce.floatVertexTextures?(Nt.boneTexture===null&&Nt.computeBoneTexture(),gt.setValue(N,"boneTexture",Nt.boneTexture,E)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}O.isBatchedMesh&&(gt.setOptional(N,O,"batchingTexture"),gt.setValue(N,"batchingTexture",O._matricesTexture,E));const Gr=z.morphAttributes;if((Gr.position!==void 0||Gr.normal!==void 0||Gr.color!==void 0&&Ce.isWebGL2===!0)&&Ve.update(O,z,An),(Ti||Ge.receiveShadow!==O.receiveShadow)&&(Ge.receiveShadow=O.receiveShadow,gt.setValue(N,"receiveShadow",O.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Rn.envMap.value=Ae,Rn.flipEnvMap.value=Ae.isCubeTexture&&Ae.isRenderTargetTexture===!1?-1:1),Ti&&(gt.setValue(N,"toneMappingExposure",M.toneMappingExposure),Ge.needsLights&&Al(Rn,zr),ue&&H.fog===!0&&ce.refreshFogUniforms(Rn,ue),ce.refreshMaterialUniforms(Rn,H,K,W,ve),Er.upload(N,Qs(Ge),Rn,E)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Er.upload(N,Qs(Ge),Rn,E),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&gt.setValue(N,"center",O.center),gt.setValue(N,"modelViewMatrix",O.modelViewMatrix),gt.setValue(N,"normalMatrix",O.normalMatrix),gt.setValue(N,"modelMatrix",O.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Nt=H.uniformsGroups;for(let Hr=0,Cl=Nt.length;Hr<Cl;Hr++)if(Ce.isWebGL2){const na=Nt[Hr];Xe.update(na,An),Xe.bind(na,An)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return An}function Al(S,F){S.ambientLightColor.needsUpdate=F,S.lightProbe.needsUpdate=F,S.directionalLights.needsUpdate=F,S.directionalLightShadows.needsUpdate=F,S.pointLights.needsUpdate=F,S.pointLightShadows.needsUpdate=F,S.spotLights.needsUpdate=F,S.spotLightShadows.needsUpdate=F,S.rectAreaLights.needsUpdate=F,S.hemisphereLights.needsUpdate=F}function Rl(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(S,F,z){Ne.get(S.texture).__webglTexture=F,Ne.get(S.depthTexture).__webglTexture=z;const H=Ne.get(S);H.__hasExternalTextures=!0,H.__hasExternalTextures&&(H.__autoAllocateDepthBuffer=z===void 0,H.__autoAllocateDepthBuffer||Me.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(S,F){const z=Ne.get(S);z.__webglFramebuffer=F,z.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(S,F=0,z=0){w=S,P=F,A=z;let H=!0,O=null,ue=!1,ge=!1;if(S){const Ae=Ne.get(S);Ae.__useDefaultFramebuffer!==void 0?(pe.bindFramebuffer(N.FRAMEBUFFER,null),H=!1):Ae.__webglFramebuffer===void 0?E.setupRenderTarget(S):Ae.__hasExternalTextures&&E.rebindTextures(S,Ne.get(S.texture).__webglTexture,Ne.get(S.depthTexture).__webglTexture);const Be=S.texture;(Be.isData3DTexture||Be.isDataArrayTexture||Be.isCompressedArrayTexture)&&(ge=!0);const Pe=Ne.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Pe[F])?O=Pe[F][z]:O=Pe[F],ue=!0):Ce.isWebGL2&&S.samples>0&&E.useMultisampledRTT(S)===!1?O=Ne.get(S).__webglMultisampledFramebuffer:Array.isArray(Pe)?O=Pe[z]:O=Pe,y.copy(S.viewport),V.copy(S.scissor),X=S.scissorTest}else y.copy(j).multiplyScalar(K).floor(),V.copy(ie).multiplyScalar(K).floor(),X=re;if(pe.bindFramebuffer(N.FRAMEBUFFER,O)&&Ce.drawBuffers&&H&&pe.drawBuffers(S,O),pe.viewport(y),pe.scissor(V),pe.setScissorTest(X),ue){const Ae=Ne.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+F,Ae.__webglTexture,z)}else if(ge){const Ae=Ne.get(S.texture),Be=F||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ae.__webglTexture,z||0,Be)}q=-1},this.readRenderTargetPixels=function(S,F,z,H,O,ue,ge){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=Ne.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ge!==void 0&&(ye=ye[ge]),ye){pe.bindFramebuffer(N.FRAMEBUFFER,ye);try{const Ae=S.texture,Be=Ae.format,Pe=Ae.type;if(Be!==Zt&&fe.convert(Be)!==N.getParameter(N.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const De=Pe===Ni&&(Me.has("EXT_color_buffer_half_float")||Ce.isWebGL2&&Me.has("EXT_color_buffer_float"));if(Pe!==yn&&fe.convert(Pe)!==N.getParameter(N.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Pe===Sn&&(Ce.isWebGL2||Me.has("OES_texture_float")||Me.has("WEBGL_color_buffer_float")))&&!De){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=S.width-H&&z>=0&&z<=S.height-O&&N.readPixels(F,z,H,O,fe.convert(Be),fe.convert(Pe),ue)}finally{const Ae=w!==null?Ne.get(w).__webglFramebuffer:null;pe.bindFramebuffer(N.FRAMEBUFFER,Ae)}}},this.copyFramebufferToTexture=function(S,F,z=0){const H=Math.pow(2,-z),O=Math.floor(F.image.width*H),ue=Math.floor(F.image.height*H);E.setTexture2D(F,0),N.copyTexSubImage2D(N.TEXTURE_2D,z,0,0,S.x,S.y,O,ue),pe.unbindTexture()},this.copyTextureToTexture=function(S,F,z,H=0){const O=F.image.width,ue=F.image.height,ge=fe.convert(z.format),ye=fe.convert(z.type);E.setTexture2D(z,0),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,z.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,z.unpackAlignment),F.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,H,S.x,S.y,O,ue,ge,ye,F.image.data):F.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,H,S.x,S.y,F.mipmaps[0].width,F.mipmaps[0].height,ge,F.mipmaps[0].data):N.texSubImage2D(N.TEXTURE_2D,H,S.x,S.y,ge,ye,F.image),H===0&&z.generateMipmaps&&N.generateMipmap(N.TEXTURE_2D),pe.unbindTexture()},this.copyTextureToTexture3D=function(S,F,z,H,O=0){if(M.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ue=S.max.x-S.min.x+1,ge=S.max.y-S.min.y+1,ye=S.max.z-S.min.z+1,Ae=fe.convert(H.format),Be=fe.convert(H.type);let Pe;if(H.isData3DTexture)E.setTexture3D(H,0),Pe=N.TEXTURE_3D;else if(H.isDataArrayTexture||H.isCompressedArrayTexture)E.setTexture2DArray(H,0),Pe=N.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,H.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,H.unpackAlignment);const De=N.getParameter(N.UNPACK_ROW_LENGTH),st=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Dt=N.getParameter(N.UNPACK_SKIP_PIXELS),dt=N.getParameter(N.UNPACK_SKIP_ROWS),en=N.getParameter(N.UNPACK_SKIP_IMAGES),tt=z.isCompressedTexture?z.mipmaps[O]:z.image;N.pixelStorei(N.UNPACK_ROW_LENGTH,tt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,tt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,S.min.x),N.pixelStorei(N.UNPACK_SKIP_ROWS,S.min.y),N.pixelStorei(N.UNPACK_SKIP_IMAGES,S.min.z),z.isDataTexture||z.isData3DTexture?N.texSubImage3D(Pe,O,F.x,F.y,F.z,ue,ge,ye,Ae,Be,tt.data):z.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),N.compressedTexSubImage3D(Pe,O,F.x,F.y,F.z,ue,ge,ye,Ae,tt.data)):N.texSubImage3D(Pe,O,F.x,F.y,F.z,ue,ge,ye,Ae,Be,tt),N.pixelStorei(N.UNPACK_ROW_LENGTH,De),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,st),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Dt),N.pixelStorei(N.UNPACK_SKIP_ROWS,dt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,en),O===0&&H.generateMipmaps&&N.generateMipmap(Pe),pe.unbindTexture()},this.initTexture=function(S){S.isCubeTexture?E.setTextureCube(S,0):S.isData3DTexture?E.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?E.setTexture2DArray(S,0):E.setTexture2D(S,0),pe.unbindTexture()},this.resetState=function(){P=0,A=0,w=null,pe.reset(),Ie.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Vs?"display-p3":"srgb",t.unpackColorSpace=Ze.workingColorSpace===Ir?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===pt?Hn:Yo}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Hn?pt:dn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Jp extends ml{}Jp.prototype.isWebGL1Renderer=!0;class Eo extends xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Qp{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Rs,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=un()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=un()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=un()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const yt=new R;class Dr{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix4(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyNormalMatrix(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.transformDirection(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}setX(e,t){return this.normalized&&(t=Ye(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ye(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ye(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ye(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Qt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Qt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Qt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Qt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array),r=Ye(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array),r=Ye(r,this.array),s=Ye(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Vt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Dr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class qs extends Kt{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ke(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let li;const Ci=new R,ci=new R,hi=new R,ui=new Se,Pi=new Se,gl=new at,fr=new R,Li=new R,pr=new R,yo=new Se,_s=new Se,To=new Se;class _i extends xt{constructor(e=new qs){if(super(),this.isSprite=!0,this.type="Sprite",li===void 0){li=new lt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Qp(t,5);li.setIndex([0,1,2,0,2,3]),li.setAttribute("position",new Dr(n,3,0,!1)),li.setAttribute("uv",new Dr(n,2,3,!1))}this.geometry=li,this.material=e,this.center=new Se(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ci.setFromMatrixScale(this.matrixWorld),gl.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),hi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ci.multiplyScalar(-hi.z);const n=this.material.rotation;let r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));const o=this.center;mr(fr.set(-.5,-.5,0),hi,o,ci,r,s),mr(Li.set(.5,-.5,0),hi,o,ci,r,s),mr(pr.set(.5,.5,0),hi,o,ci,r,s),yo.set(0,0),_s.set(1,0),To.set(1,1);let a=e.ray.intersectTriangle(fr,Li,pr,!1,Ci);if(a===null&&(mr(Li.set(-.5,.5,0),hi,o,ci,r,s),_s.set(0,1),a=e.ray.intersectTriangle(fr,pr,Li,!1,Ci),a===null))return;const l=e.ray.origin.distanceTo(Ci);l<e.near||l>e.far||t.push({distance:l,point:Ci.clone(),uv:Ft.getInterpolation(Ci,fr,Li,pr,yo,_s,To,new Se),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function mr(i,e,t,n,r,s){ui.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(Pi.x=s*ui.x-r*ui.y,Pi.y=r*ui.x+s*ui.y):Pi.copy(ui),i.copy(e),i.x+=Pi.x,i.y+=Pi.y,i.applyMatrix4(gl)}class hn extends Kt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ke(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const bo=new R,wo=new R,Ao=new at,vs=new Ws,gr=new Gi;class _l extends xt{constructor(e=new lt,t=new hn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)bo.fromBufferAttribute(t,r-1),wo.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=bo.distanceTo(wo);e.setAttribute("lineDistance",new rt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),gr.copy(n.boundingSphere),gr.applyMatrix4(r),gr.radius+=s,e.ray.intersectsSphere(gr)===!1)return;Ao.copy(r).invert(),vs.copy(e.ray).applyMatrix4(Ao);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new R,h=new R,d=new R,f=new R,m=this.isLineSegments?2:1,g=n.index,p=n.attributes.position;if(g!==null){const u=Math.max(0,o.start),T=Math.min(g.count,o.start+o.count);for(let M=u,b=T-1;M<b;M+=m){const P=g.getX(M),A=g.getX(M+1);if(c.fromBufferAttribute(p,P),h.fromBufferAttribute(p,A),vs.distanceSqToSegment(c,h,f,d)>l)continue;f.applyMatrix4(this.matrixWorld);const q=e.ray.origin.distanceTo(f);q<e.near||q>e.far||t.push({distance:q,point:d.clone().applyMatrix4(this.matrixWorld),index:M,face:null,faceIndex:null,object:this})}}else{const u=Math.max(0,o.start),T=Math.min(p.count,o.start+o.count);for(let M=u,b=T-1;M<b;M+=m){if(c.fromBufferAttribute(p,M),h.fromBufferAttribute(p,M+1),vs.distanceSqToSegment(c,h,f,d)>l)continue;f.applyMatrix4(this.matrixWorld);const A=e.ray.origin.distanceTo(f);A<e.near||A>e.far||t.push({distance:A,point:d.clone().applyMatrix4(this.matrixWorld),index:M,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const Ro=new R,Co=new R;class Ct extends _l{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Ro.fromBufferAttribute(t,r),Co.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Ro.distanceTo(Co);e.setAttribute("lineDistance",new rt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class vl extends Kt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ke(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Po=new at,Ds=new Ws,_r=new Gi,vr=new R;class em extends xt{constructor(e=new lt,t=new vl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),_r.copy(n.boundingSphere),_r.applyMatrix4(r),_r.radius+=s,e.ray.intersectsSphere(_r)===!1)return;Po.copy(r).invert(),Ds.copy(e.ray).applyMatrix4(Po);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),m=Math.min(c.count,o.start+o.count);for(let g=f,_=m;g<_;g++){const p=c.getX(g);vr.fromBufferAttribute(d,p),Lo(vr,p,l,r,e,t,this)}}else{const f=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let g=f,_=m;g<_;g++)vr.fromBufferAttribute(d,g),Lo(vr,g,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Lo(i,e,t,n,r,s,o){const a=Ds.distanceSqToPoint(i);if(a<t){const l=new R;Ds.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class xl extends Lt{constructor(e,t,n,r,s,o,a,l,c){super(e,t,n,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ys extends lt{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],l=[],c=new R,h=new Se;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){const m=n+d/t*r;c.x=e*Math.cos(m),c.y=e*Math.sin(m),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[f]/e+1)/2,h.y=(o[f+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new rt(o,3)),this.setAttribute("normal",new rt(a,3)),this.setAttribute("uv",new rt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ys(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Vi extends lt{constructor(e=1,t=1,n=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const h=[],d=[],f=[],m=[];let g=0;const _=[],p=n/2;let u=0;T(),o===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new rt(d,3)),this.setAttribute("normal",new rt(f,3)),this.setAttribute("uv",new rt(m,2));function T(){const b=new R,P=new R;let A=0;const w=(t-e)/n;for(let q=0;q<=s;q++){const x=[],y=q/s,V=y*(t-e)+e;for(let X=0;X<=r;X++){const ne=X/r,L=ne*l+a,G=Math.sin(L),W=Math.cos(L);P.x=V*G,P.y=-y*n+p,P.z=V*W,d.push(P.x,P.y,P.z),b.set(G,w,W).normalize(),f.push(b.x,b.y,b.z),m.push(ne,1-y),x.push(g++)}_.push(x)}for(let q=0;q<r;q++)for(let x=0;x<s;x++){const y=_[x][q],V=_[x+1][q],X=_[x+1][q+1],ne=_[x][q+1];h.push(y,V,ne),h.push(V,X,ne),A+=6}c.addGroup(u,A,0),u+=A}function M(b){const P=g,A=new Se,w=new R;let q=0;const x=b===!0?e:t,y=b===!0?1:-1;for(let X=1;X<=r;X++)d.push(0,p*y,0),f.push(0,y,0),m.push(.5,.5),g++;const V=g;for(let X=0;X<=r;X++){const L=X/r*l+a,G=Math.cos(L),W=Math.sin(L);w.x=x*W,w.y=p*y,w.z=x*G,d.push(w.x,w.y,w.z),f.push(0,y,0),A.x=G*.5+.5,A.y=W*.5*y+.5,m.push(A.x,A.y),g++}for(let X=0;X<r;X++){const ne=P+X,L=V+X;b===!0?h.push(L,L+1,ne):h.push(L+1,L,ne),q+=3}c.addGroup(u,q,b===!0?1:2),u+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Zs extends Vi{constructor(e=1,t=1,n=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,n,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Zs(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const xr=new R,Sr=new R,xs=new R,Mr=new Ft;class vn extends lt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const r=Math.pow(10,4),s=Math.cos(mi*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),f={},m=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:_,b:p,c:u}=Mr;if(_.fromBufferAttribute(a,c[0]),p.fromBufferAttribute(a,c[1]),u.fromBufferAttribute(a,c[2]),Mr.getNormal(xs),d[0]=`${Math.round(_.x*r)},${Math.round(_.y*r)},${Math.round(_.z*r)}`,d[1]=`${Math.round(p.x*r)},${Math.round(p.y*r)},${Math.round(p.z*r)}`,d[2]=`${Math.round(u.x*r)},${Math.round(u.y*r)},${Math.round(u.z*r)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let T=0;T<3;T++){const M=(T+1)%3,b=d[T],P=d[M],A=Mr[h[T]],w=Mr[h[M]],q=`${b}_${P}`,x=`${P}_${b}`;x in f&&f[x]?(xs.dot(f[x].normal)<=s&&(m.push(A.x,A.y,A.z),m.push(w.x,w.y,w.z)),f[x]=null):q in f||(f[q]={index0:c[T],index1:c[M],normal:xs.clone()})}}for(const g in f)if(f[g]){const{index0:_,index1:p}=f[g];xr.fromBufferAttribute(a,_),Sr.fromBufferAttribute(a,p),m.push(xr.x,xr.y,xr.z),m.push(Sr.x,Sr.y,Sr.z)}this.setAttribute("position",new rt(m,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Bi extends lt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],d=new R,f=new R,m=[],g=[],_=[],p=[];for(let u=0;u<=n;u++){const T=[],M=u/n;let b=0;u===0&&o===0?b=.5/t:u===n&&l===Math.PI&&(b=-.5/t);for(let P=0;P<=t;P++){const A=P/t;d.x=-e*Math.cos(r+A*s)*Math.sin(o+M*a),d.y=e*Math.cos(o+M*a),d.z=e*Math.sin(r+A*s)*Math.sin(o+M*a),g.push(d.x,d.y,d.z),f.copy(d).normalize(),_.push(f.x,f.y,f.z),p.push(A+b,1-M),T.push(c++)}h.push(T)}for(let u=0;u<n;u++)for(let T=0;T<t;T++){const M=h[u][T+1],b=h[u][T],P=h[u+1][T],A=h[u+1][T+1];(u!==0||o>0)&&m.push(M,b,A),(u!==n-1||l<Math.PI)&&m.push(b,P,A)}this.setIndex(m),this.setAttribute("position",new rt(g,3)),this.setAttribute("normal",new rt(_,3)),this.setAttribute("uv",new rt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Gs}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Gs);class jt{}function Sl(i){return Object.keys(i).forEach(e=>{const t=i[e];t&&typeof t=="object"&&Sl(t)}),Object.freeze(i)}const I=Sl({core:{deltaTimeCap:.1,aimTolerance:.15},camera:{fov:75,near:.1,far:5e3,position:{x:0,y:.5,z:0},lookAt:{x:0,y:.5,z:-1},backgroundColor:0},player:{baseForwardSpeed:100,forwardSpeeds:{DOGFIGHT:100,SURFACE:200,TRENCH:500},turnSpeedYaw:Math.PI/1.5,turnSpeedPitch:Math.PI/1.5,maxBank:Math.PI/4,meshColor:65280,meshSize:1,maxShields:6},starField:{numStars:1500,fieldSize:500,starColor:16777215,starSize:.5},input:{sensitivity:5,touchRadius:100,centeringSpeed:2},ui:{highScore:1e4,damageFlashDuration:150},stages:{dogfight:{killsThreshold:10},surface:{length:1e4,width:2e3,gridSpacing:100,color:255,floorY:-50,floorBounce:2,floorClampBuffer:10,collisionDamage:1,towerHeight:50,towerWidth:30,towerColor:13369344,towerSpawnInterval:1.5,towerSpawnDistance:1e3,towerCleanupDistance:200,towerMarginX:50,towerPoints:200,duration:30,maxPitch:Math.PI/4,maxYaw:Math.PI/4,maxHeight:150},trench:{transitionDistance:100,width:100,height:100,steeringStrength:.5,length:5e3,catwalkStartZ:-500,catwalkEndZ:-4500,catwalkSpacing:500,catwalkYOffset:20,catwalkDepth:20,catwalkCollisionThreshold:15,catwalkHeightThreshold:15,exhaustPortZOffset:400,maxPitch:Math.PI/6,maxYaw:Math.PI/6,catwalkColor:11184810,wallColor:65280,verticalDetailSpacing:200,horizontalDetailSpacing:50,verticalDetailColor:65280,horizontalDetailColor:65280,exhaustPortColor:16776960,turretSize:20,fireballSize:20},deathStar:{distance:1e3,size:100,hullSegmentsX:12,hullSegmentsY:8,trenchSegments:16,dishSegments:12,dishSize:20,trenchWidth:4,color:65280,dishColor:13434828,spawnAngle:Math.PI/4}},progression:{wave1:["DOGFIGHT","TRENCH","EXPLOSION"],default:["DOGFIGHT","SURFACE","TRENCH","EXPLOSION"]},tieFighter:{speed:50,oscillationFrequency:1,oscillationAmplitude:15,distance:60,meshColor:16711680,meshSize:1,points:100,explosionVelocity:50,spawnInterval:3,cleanupDistance:600,smartAI:{speed:180,oscillationFreq:2,oscillationAmp:10,spawnDistanceBehind:100,spawnRandomZ:50,spawnRandomX:40,spawnRandomY:30,arcAmplitude:40,arcFrequency:.5,arcIntensity:.8,arcFalloff:60,verticalSwayRatio:.5,shadowDistance:-50,shadowDuration:3,brakingZone:60,stageThreshold:.1,escapeAccelerationDuration:6,escapeFadeDuration:3,rotationSpeed:10,escapeFarRandomX:.4,escapeFarRandomY:.4,escapeFarZ:-1,escapeQuickRandomX:2.5,escapeQuickRandomY:2,escapeQuickZ:-.5}},laser:{speed:2e3,cooldown:.15,maxRange:800,targetDepth:200,boltLength:30,thickness:10,color:65535,alternateColor:255,offsets:[{x:-1.2,y:.8},{x:1.2,y:.8},{x:-1.2,y:-.8},{x:1.2,y:-.8}]},fireball:{meshSize:3,meshColor:16729344,relativeSpeed:40,fireRate:2,collisionRadiusWorld:2,collisionRadiusNDC:.05,points:100,damage:1,expirationDistance:2e3,sparkleCount:8,sparkleSize:4,explosionVelocity:30,explosionDuration:.5,hitZThreshold:-.8,hitDistanceThreshold:2,hitNDCThreshold:1.2},torpedo:{speedMultiplier:2,cooldown:2,bonusPoints:1e4,range:2e3,sparkleCount:8,sparkleSize:4,explosionVelocity:30,explosionDuration:.5},turret:{meshSize:5,meshColor:16711680,fireRate:3,range:1500,spacing:400,points:200},explosionStage:{duration:5,escapeSpeed:1e3,shatterDelay:2},deathStarExplosion:{fragmentVelocity:100,fragmentRotationSpeed:2,particleCount:50}});class tm extends jt{constructor(){super();U(this,"mesh");U(this,"visualMesh");this.mesh=new Rt;const t=new kt(I.player.meshSize,I.player.meshSize,I.player.meshSize),n=new vn(t),r=new hn({color:I.player.meshColor});this.visualMesh=new Ct(n,r),this.visualMesh.visible=!1,this.mesh.add(this.visualMesh),this.position.set(0,0,0)}get position(){return this.mesh.position}update(t,n,r,s=!1,o){this.visualMesh.visible=s;const a=-t.x*I.player.turnSpeedYaw*n,l=t.y*I.player.turnSpeedPitch*n;if(o!=null&&o.lockUpright){const d=new Tn().setFromQuaternion(this.mesh.quaternion,"YXZ");let f=d.x+l,m=d.y+a;o.maxPitch!==void 0&&(f=Ht.clamp(f,-o.maxPitch,o.maxPitch)),o.maxYaw!==void 0&&(m=Ht.clamp(m,-o.maxYaw,o.maxYaw)),this.mesh.quaternion.setFromEuler(new Tn(f,m,0,"YXZ"))}else{const d=new wn().setFromEuler(new Tn(l,a,0,"YXZ"));this.mesh.quaternion.multiply(d)}const c=-t.x*I.player.maxBank;this.visualMesh.rotation.z=c;const h=new R(0,0,-1).applyQuaternion(this.mesh.quaternion);this.position.add(h.multiplyScalar(r*n))}}const bt=class bt extends jt{constructor(t){super();U(this,"mesh");U(this,"strategy");U(this,"isExploded",!1);U(this,"pieceVelocities",[]);U(this,"fireCooldown",Math.random()*I.fireball.fireRate);this.mesh=new Rt,this.strategy=t;const n=I.tieFighter.meshSize;bt.material||(bt.material=new kn({color:I.tieFighter.meshColor,wireframe:!0})),bt.bodyGeo||(bt.bodyGeo=new Bi(n/3,8,8)),bt.wingGeo||(bt.wingGeo=new Hi(n,n));const r=bt.material.clone(),s=new Qe(bt.bodyGeo,r);this.mesh.add(s);const o=new Qe(bt.wingGeo,r);o.position.set(-n*.8,0,0),o.rotation.y=Math.PI/2,this.mesh.add(o);const a=new Qe(bt.wingGeo,r);a.position.set(n*.8,0,0),a.rotation.y=Math.PI/2,this.mesh.add(a)}getWorldPosition(t){return this.mesh.updateWorldMatrix(!0,!1),this.mesh.getWorldPosition(t)}get position(){return this.mesh.position}explode(){this.isExploded||(this.isExploded=!0,this.mesh.children.forEach(()=>{const t=I.tieFighter.explosionVelocity,n=new R((Math.random()-.5)*t,(Math.random()-.5)*t,(Math.random()-.5)*t);this.pieceVelocities.push(n)}))}update(t,n,r,s){if(this.isExploded)return this.mesh.children.forEach((o,a)=>{this.pieceVelocities[a]&&(o.position.addScaledVector(this.pieceVelocities[a],t),o.rotation.x+=t*2,o.rotation.y+=t*2)}),null;if(this.fireCooldown-=t,this.strategy.update(t,this.mesh.position,this.mesh.quaternion,n,r,s),this.strategy.getColor){const o=this.strategy.getColor(D.isModeColoring);this.mesh.children.forEach(a=>{a instanceof Qe&&a.material instanceof kn&&a.material.color.setHex(o)})}return this.fireCooldown<=0?(this.fireCooldown=I.fireball.fireRate,new R().subVectors(n,this.position).normalize()):null}getScore(){return I.tieFighter.points}getVelocity(t,n){return t.clone().multiplyScalar(n)}setStrategy(t){this.strategy=t}dispose(){this.mesh.traverse(t=>{t instanceof Qe&&t.material instanceof Kt&&t.material.dispose()})}};U(bt,"material"),U(bt,"bodyGeo"),U(bt,"wingGeo");let Us=bt;class nm{constructor(){U(this,"elapsedTime",0);U(this,"offset",new R)}update(e,t,n,r,s,o){this.elapsedTime+=e,this.offset.set(0,0,-I.tieFighter.distance);const a=Math.sin(this.elapsedTime*I.tieFighter.oscillationFrequency)*I.tieFighter.oscillationAmplitude;this.offset.x+=a,this.offset.applyQuaternion(s),t.copy(r).add(this.offset),n.copy(s)}}class im{constructor(e=Math){U(this,"elapsedTime",0);U(this,"shadowTimer",0);U(this,"escapeTimer",0);U(this,"extraIntensity",0);U(this,"isInitialized",!1);U(this,"stage","APPROACH");U(this,"offset",new R);U(this,"escapeDirection",new R(0,0,-1));U(this,"arcDirection",new Se);U(this,"stageOffsets",{x:0,y:0});U(this,"prevWorldPos",new R);U(this,"currentRelativePos",new R);U(this,"velocity",new R);U(this,"lookTarget",new R);U(this,"targetQuat",new wn);U(this,"lookMat",new at);U(this,"upVector",new R(0,1,0));U(this,"tempVector",new R);this.rng=e,this.arcDirection.set(this.rng.random()>.5?1:-1,this.rng.random()>.5?1:-1),this.stageOffsets.x=this.rng.random()*Math.PI*2,this.stageOffsets.y=this.rng.random()*Math.PI*2}getColor(e=!1){return e?this.stage==="ESCAPE"?16776960:this.stage==="SHADOW"?65535:I.tieFighter.meshColor:I.tieFighter.meshColor}update(e,t,n,r,s,o){const a=I.tieFighter.smartAI;if(this.elapsedTime+=e,!this.isInitialized){const u=a.spawnDistanceBehind+this.rng.random()*a.spawnRandomZ;this.offset.set((this.rng.random()-.5)*a.spawnRandomX,(this.rng.random()-.5)*a.spawnRandomY,u),this.isInitialized=!0}this.prevWorldPos.copy(t);const l=a.speed-o;let c=1;if(this.stage==="APPROACH"){const u=this.offset.z-a.shadowDistance;c=Ht.clamp(u/a.brakingZone,0,1),this.offset.z-=l*c*e,this.extraIntensity=a.arcIntensity*(1-c),u<=a.stageThreshold&&(this.stage="SHADOW",this.shadowTimer=0,this.offset.z=a.shadowDistance,this.extraIntensity=a.arcIntensity)}else if(this.stage==="SHADOW")this.shadowTimer+=e,this.offset.z=a.shadowDistance,this.extraIntensity=a.arcIntensity,this.shadowTimer>=a.shadowDuration&&(this.stage="ESCAPE",this.escapeTimer=0,this.rng.random()>.5?this.escapeDirection.set((this.rng.random()-.5)*a.escapeFarRandomX,(this.rng.random()-.5)*a.escapeFarRandomY,a.escapeFarZ).normalize():this.escapeDirection.set((this.rng.random()-.5)*a.escapeQuickRandomX,(this.rng.random()-.5)*a.escapeQuickRandomY,a.escapeQuickZ).normalize());else if(this.stage==="ESCAPE"){this.escapeTimer+=e;const u=Ht.clamp(this.escapeTimer/a.escapeAccelerationDuration,0,1);c=u*u;const T=l*c*e;this.offset.x+=this.escapeDirection.x*T,this.offset.y+=this.escapeDirection.y*T,this.offset.z+=this.escapeDirection.z*T,this.extraIntensity=Math.max(0,a.arcIntensity*(1-this.escapeTimer/a.escapeFadeDuration))}const h=Math.abs(this.offset.z),f=1-Math.max(0,Math.min(1,h/a.arcFalloff))+this.extraIntensity,m=this.elapsedTime*a.arcFrequency,g=Math.sin(m+this.stageOffsets.x)*a.arcAmplitude*f*this.arcDirection.x,_=Math.cos(m+this.stageOffsets.y)*a.arcAmplitude*a.verticalSwayRatio*f*this.arcDirection.y,p=Math.sin(this.elapsedTime*a.oscillationFreq)*a.oscillationAmp;this.currentRelativePos.copy(this.offset),this.currentRelativePos.x+=g+p,this.currentRelativePos.y+=_,t.copy(this.currentRelativePos).applyQuaternion(s).add(r),this.velocity.copy(t).sub(this.prevWorldPos),this.velocity.lengthSq()>1e-4?(this.lookTarget.copy(t).add(this.velocity),this.tempVector.copy(this.upVector).applyQuaternion(s),this.lookMat.lookAt(t,this.lookTarget,this.tempVector),this.targetQuat.setFromRotationMatrix(this.lookMat)):this.targetQuat.copy(s),n.slerp(this.targetQuat,Math.min(1,e*a.rotationSpeed))}}class rm{constructor(e=Math){this.rng=e}createStrategy(e){return e?new im(this.rng):new nm}}const On=class On extends jt{constructor(t,n,r=I.fireball.sparkleSize){super();U(this,"mesh");U(this,"velocity");U(this,"previousPosition");U(this,"isExploded",!1);U(this,"explosionTimer",0);U(this,"sparkleVelocities",[]);U(this,"sparkleRotationSpeeds",[]);this.mesh=new Rt,this.mesh.position.copy(t),this.previousPosition=t.clone(),this.velocity=n.clone(),On.sharedTexture||(On.sharedTexture=On.createSparkleTexture());const s=new ke(I.fireball.meshColor);for(let o=0;o<I.fireball.sparkleCount;o++){const a=s.clone();a.offsetHSL((Math.random()-.5)*.1,0,(Math.random()-.5)*.2);const l=new qs({map:On.sharedTexture,color:a,transparent:!0,blending:Tr,rotation:Math.random()*Math.PI*2}),c=new _i(l);c.scale.set(r,r,1),c.position.set((Math.random()-.5)*.5,(Math.random()-.5)*.5,(Math.random()-.5)*.5),this.mesh.add(c),this.sparkleVelocities.push(new R),this.sparkleRotationSpeeds.push((Math.random()-.5)*8)}}static createSparkleTexture(){const t=document.createElement("canvas");t.width=64,t.height=64;const n=t.getContext("2d");if(n){n.strokeStyle="#ffffff",n.lineWidth=3,n.translate(32,32);for(let s=0;s<4;s++)n.beginPath(),n.moveTo(0,-25),n.lineTo(0,25),n.stroke(),n.rotate(Math.PI/4);n.strokeRect(-4,-4,8,8)}return new xl(t)}get position(){return this.mesh.position}explode(){this.isExploded||(this.isExploded=!0,this.mesh.children.forEach((t,n)=>{const r=new R(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize();this.sparkleVelocities[n].copy(r).multiplyScalar(I.fireball.explosionVelocity),this.sparkleRotationSpeeds[n]*=2.5}))}update(t){this.previousPosition.copy(this.mesh.position),this.mesh.position.addScaledVector(this.velocity,t),this.isExploded&&(this.explosionTimer+=t),this.mesh.children.forEach((n,r)=>{n instanceof _i&&(n.material.rotation+=this.sparkleRotationSpeeds[r]*t,this.isExploded&&n.position.addScaledVector(this.sparkleVelocities[r],t))})}isExpired(){return this.isExploded&&this.explosionTimer>=I.fireball.explosionDuration}projectToNDC(t,n){n.copy(this.position).project(t)}getNDCDelta(t){const n=this.position.clone();return n.project(t),n}dispose(){this.mesh.children.forEach(t=>{t instanceof _i&&t.material.dispose()})}};U(On,"sharedTexture",null);let Is=On;class sm extends jt{constructor(t,n,r){super();U(this,"mesh");U(this,"progress",0);U(this,"origin2D");U(this,"target2D");U(this,"color");this.origin2D=t.clone(),this.target2D=n.clone(),this.color=r;const s=new Hi(1,1),o=new kn({color:this.color,transparent:!0,opacity:1,depthTest:!1});this.mesh=new Qe(s,o),this.updateMeshTransform()}updateMeshTransform(){const t=I.laser.boltLength/I.laser.targetDepth,n=this.progress,r=Math.min(1,this.progress+t),s=new Se().lerpVectors(this.origin2D,this.target2D,n),o=new Se().lerpVectors(this.origin2D,this.target2D,r),a=new Se().subVectors(o,s),l=a.length(),c=Math.atan2(a.y,a.x),h=new Se().lerpVectors(s,o,.5);this.mesh.position.set(h.x,h.y,0),this.mesh.rotation.z=c-Math.PI/2;const f=I.laser.thickness*.001;this.mesh.scale.set(f,l,1)}update(t){const n=I.laser.targetDepth/I.laser.speed;this.progress+=1/n*t,this.updateMeshTransform()}isExpired(){return this.progress>=1}dispose(){this.mesh.geometry.dispose(),Array.isArray(this.mesh.material)?this.mesh.material.forEach(t=>t.dispose()):this.mesh.material.dispose()}}const Bn=class Bn extends jt{constructor(t,n){super();U(this,"mesh");U(this,"velocity");U(this,"previousPosition");U(this,"isExploded",!1);U(this,"explosionTimer",0);U(this,"sparkleVelocities",[]);U(this,"sparkleRotationSpeeds",[]);this.mesh=new Rt,this.mesh.position.copy(t),this.previousPosition=t.clone(),this.velocity=n.clone();const r=new ke(65535),s=I.torpedo.sparkleSize*1.5;Bn.sparkleTexture||(Bn.sparkleTexture=Bn.createSparkleTexture());for(let o=0;o<I.torpedo.sparkleCount;o++){const a=new qs({map:Bn.sparkleTexture,color:r,transparent:!0,blending:Tr,rotation:Math.random()*Math.PI*2}),l=new _i(a);l.scale.set(s,s,1),l.position.set((Math.random()-.5)*.5,(Math.random()-.5)*.5,(Math.random()-.5)*.5),this.mesh.add(l),this.sparkleVelocities.push(new R),this.sparkleRotationSpeeds.push((Math.random()-.5)*10)}}static createSparkleTexture(){const t=document.createElement("canvas");t.width=64,t.height=64;const n=t.getContext("2d");if(n){n.strokeStyle="#ffffff",n.lineWidth=4,n.translate(32,32);for(let r=0;r<2;r++)n.beginPath(),n.moveTo(0,-30),n.lineTo(0,30),n.stroke(),n.rotate(Math.PI/2);n.beginPath(),n.arc(0,0,10,0,Math.PI*2),n.stroke()}return new xl(t)}get position(){return this.mesh.position}explode(){this.isExploded||(this.isExploded=!0,this.mesh.children.forEach((t,n)=>{const r=new R(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize();this.sparkleVelocities[n].copy(r).multiplyScalar(I.torpedo.explosionVelocity*1.5),this.sparkleRotationSpeeds[n]*=3}))}update(t){this.previousPosition.copy(this.mesh.position),this.mesh.position.addScaledVector(this.velocity,t),this.isExploded&&(this.explosionTimer+=t),this.mesh.children.forEach((n,r)=>{n instanceof _i&&(n.material.rotation+=this.sparkleRotationSpeeds[r]*t,this.isExploded&&n.position.addScaledVector(this.sparkleVelocities[r],t))})}isExpired(){return this.isExploded&&this.explosionTimer>=I.torpedo.explosionDuration}dispose(){this.mesh.children.forEach(t=>{t instanceof _i&&t.material.dispose()})}};U(Bn,"sparkleTexture",null);let Fs=Bn;class am{constructor(e,t,n=new rm){U(this,"tieFighters",[]);U(this,"fireballs",[]);U(this,"lasers",[]);U(this,"torpedoes",[]);U(this,"additionalTargets",[]);U(this,"spawnTimer",0);U(this,"worldScene");U(this,"hudScene");U(this,"strategyFactory");U(this,"spawningEnabled",!0);U(this,"scratchPlayerVelocity",new R);U(this,"scratchRelativeVelocity",new R);U(this,"scratchTotalVelocity",new R);U(this,"scratchFireballPos",new R);U(this,"scratchPlayerForward",new R);U(this,"scratchToFireball",new R);U(this,"scratchToPrevFireball",new R);U(this,"scratchCameraPos",new R);U(this,"scratchCameraDir",new R);this.worldScene=e,this.hudScene=t,this.strategyFactory=n}update(e,t,n,r,s,o,a){this.scratchPlayerForward.set(0,0,-1).applyQuaternion(n);for(let l=this.tieFighters.length-1;l>=0;l--){const c=this.tieFighters[l],h=c.update(e,t,n,o);h&&!c.isExploded&&this.spawnFireballFromTarget(c,h,n,o),c.position.distanceTo(t)>I.tieFighter.cleanupDistance&&this.removeTieFighter(l)}for(let l=this.fireballs.length-1;l>=0;l--){const c=this.fireballs[l];if(c.update(e),c.isExpired()){this.removeFireball(l);continue}const h=c.position.distanceTo(t);if(h>I.fireball.expirationDistance){this.removeFireball(l);continue}if(!c.isExploded){s.getWorldPosition(this.scratchCameraPos),s.getWorldDirection(this.scratchCameraDir),this.scratchToFireball.subVectors(c.position,this.scratchCameraPos),this.scratchToPrevFireball.subVectors(c.previousPosition,this.scratchCameraPos);const d=this.scratchToFireball.dot(this.scratchCameraDir),f=this.scratchToPrevFireball.dot(this.scratchCameraDir),m=I.fireball.hitDistanceThreshold;if(f>m&&d<=m){this.scratchFireballPos.copy(c.previousPosition).project(s);const g=this.scratchFireballPos.x,_=this.scratchFireballPos.y,p=I.fireball.hitNDCThreshold;Math.abs(g)<=p&&Math.abs(_)<=p&&(a&&a(I.fireball.damage),c.explode())}c.isExploded||h<I.fireball.collisionRadiusWorld+I.player.meshSize&&(a&&a(I.fireball.damage),c.explode())}}for(let l=this.lasers.length-1;l>=0;l--){const c=this.lasers[l];c.update(e),c.isExpired()&&this.removeLaser(l)}for(let l=this.torpedoes.length-1;l>=0;l--){const c=this.torpedoes[l];c.update(e),c.isExpired()&&this.removeTorpedo(l)}this.spawningEnabled&&(this.spawnTimer+=e,this.spawnTimer>=I.tieFighter.spawnInterval&&(this.spawnTieFighter(r),this.spawnTimer=0));for(const l of this.additionalTargets)if(l.update){const c=l.update(e,t,n,o);c&&!l.isExploded&&this.spawnFireballFromTarget(l,c,n,o)}}spawnFireballFromTarget(e,t,n,r){this.scratchPlayerForward.set(0,0,-1).applyQuaternion(n),e.getVelocity?this.scratchPlayerVelocity.copy(e.getVelocity(this.scratchPlayerForward,r)):this.scratchPlayerVelocity.copy(this.scratchPlayerForward).multiplyScalar(r),this.scratchRelativeVelocity.copy(t).multiplyScalar(I.fireball.relativeSpeed),this.scratchTotalVelocity.copy(this.scratchPlayerVelocity).add(this.scratchRelativeVelocity),e.getWorldPosition(this.scratchFireballPos);const s=e.getFireballSize?e.getFireballSize():void 0;this.spawnFireball(this.scratchFireballPos,this.scratchTotalVelocity,s)}setSpawningEnabled(e){this.spawningEnabled=e}spawnTieFighter(e){const t=this.strategyFactory.createStrategy(e),n=new Us(t);this.tieFighters.push(n),this.worldScene.add(n.mesh)}spawnFireball(e,t,n){const r=D.debugFireballSize??n??I.fireball.sparkleSize,s=new Is(e,t,r);return this.fireballs.push(s),this.worldScene.add(s.mesh),s}spawnLaser(e,t,n){const r=new sm(e,t,n);return this.lasers.push(r),this.hudScene.add(r.mesh),r}spawnTorpedo(e,t){const n=new Fs(e,t);return this.torpedoes.push(n),this.worldScene.add(n.mesh),n}removeTieFighter(e){const t=this.tieFighters[e];this.worldScene.remove(t.mesh),t.dispose(),this.tieFighters.splice(e,1)}removeFireball(e){const t=this.fireballs[e];this.worldScene.remove(t.mesh),t.dispose(),this.fireballs.splice(e,1)}removeFireballByObject(e){const t=this.fireballs.indexOf(e);t!==-1&&this.removeFireball(t)}removeLaser(e){const t=this.lasers[e];this.hudScene.remove(t.mesh),t.dispose(),this.lasers.splice(e,1)}removeTorpedo(e){const t=this.torpedoes[e];this.worldScene.remove(t.mesh),t.dispose(),this.torpedoes.splice(e,1)}getTieFighters(){return this.tieFighters}getFireballs(){return this.fireballs}getLasers(){return this.lasers}getTorpedoes(){return this.torpedoes}addTarget(e){this.additionalTargets.includes(e)||this.additionalTargets.push(e)}getTargets(){return[...this.tieFighters,...this.additionalTargets]}removeTarget(e){const t=this.additionalTargets.indexOf(e);t!==-1&&this.additionalTargets.splice(t,1)}clear(){this.tieFighters.forEach(e=>{this.worldScene.remove(e.mesh),e.dispose()}),this.tieFighters=[],this.additionalTargets=[],this.fireballs.forEach(e=>{this.worldScene.remove(e.mesh),e.dispose()}),this.fireballs=[],this.lasers.forEach(e=>{this.hudScene.remove(e.mesh),e.dispose()}),this.lasers=[],this.torpedoes.forEach(e=>{this.worldScene.remove(e.mesh),e.dispose()}),this.torpedoes=[],this.spawnTimer=0}}const Do=new R,Uo=new R,Ss=new R,Io=new R;function Ml(i,e,t){if(t.getWorldPosition(Io),Do.subVectors(i,Io).normalize(),t.getWorldDirection(Uo),Do.dot(Uo)<=0)return!1;Ss.copy(i).project(t);const n=Ss.x-e.x,r=Ss.y-e.y;return Math.sqrt(n*n+r*r)<I.core.aimTolerance}class Nr{get showStarField(){return!1}get showTitle(){return!0}getTurrets(){return[]}getPlayerOptions(){}}class El extends jt{constructor(t){super();U(this,"mesh");U(this,"geometries",[]);U(this,"materials",[]);U(this,"isExploded",!1);U(this,"fragmentVelocities",[]);U(this,"fragmentRotations",[]);this.mesh=new Rt,this.mesh.name="DeathStar";const n=I.stages.deathStar.size,r=new hn({color:I.stages.deathStar.color,transparent:!0,opacity:.6});this.materials.push(r);const s=new hn({color:I.stages.deathStar.dishColor,transparent:!0,opacity:.9});this.materials.push(s),this.createHull(n,r),this.createTrench(n,r),this.createDish(n,s),this.mesh.position.copy(t)}get position(){return this.mesh.position}createHull(t,n){const r=I.stages.deathStar.hullSegmentsX,s=I.stages.deathStar.hullSegmentsY,o=.04,a=new Bi(t,r,s,0,Math.PI*2,0,Math.PI/2-o);this.geometries.push(a);const l=new vn(a,1);this.geometries.push(l);const c=new Ct(l,n);c.name="DeathStarHullUpper",this.mesh.add(c);const h=new Bi(t,r,s,0,Math.PI*2,Math.PI/2+o,Math.PI/2-o);this.geometries.push(h);const d=new vn(h,1);this.geometries.push(d);const f=new Ct(d,n);f.name="DeathStarHullLower",this.mesh.add(f)}createTrench(t,n){const r=I.stages.deathStar.trenchWidth,s=I.stages.deathStar.trenchSegments,o=(d,f,m)=>{const g=new Vi(f,f,0,s,1,!0);this.geometries.push(g);const _=new vn(g,1);this.geometries.push(_);const p=new Ct(_,n);return p.position.y=d,m&&(p.name=m),p},a=t*.98;this.mesh.add(o(r/2,t,"DeathStarTrenchEdgeTop")),this.mesh.add(o(-r/2,t,"DeathStarTrenchEdgeBottom")),this.mesh.add(o(r/2,a,"DeathStarTrenchInnerTop")),this.mesh.add(o(-r/2,a,"DeathStarTrenchInnerBottom"));const l=new lt;this.geometries.push(l);const c=[];for(let d=0;d<s;d++){const f=d/s*Math.PI*2,m=Math.cos(f),g=Math.sin(f);c.push(m*t,r/2,g*t),c.push(m*a,r/2,g*a),c.push(m*t,-r/2,g*t),c.push(m*a,-r/2,g*a),c.push(m*a,r/2,g*a),c.push(m*a,-r/2,g*a)}l.setAttribute("position",new rt(c,3));const h=new Ct(l,n);h.name="DeathStarTrenchVerticals",this.mesh.add(h)}createDish(t,n){const r=I.stages.deathStar.dishSize,s=I.stages.deathStar.dishSegments,o=r*.4,a=new Zs(r,o,s,2,!0);this.geometries.push(a);const l=new vn(a,1);this.geometries.push(l);const c=new Ct(l,n);c.name="DeathStarDish";const h=Math.PI*.25,d=Math.PI*.25,f=t*Math.sin(h)*Math.cos(d),m=t*Math.cos(h),g=t*Math.sin(h)*Math.sin(d),_=new R(f,m,g),p=_.clone().normalize();c.position.copy(_).addScaledVector(p,-o*.5),c.lookAt(new R(0,0,0)),c.rotateX(-Math.PI/2),this.mesh.add(c);for(let u=1;u<3;u++){const T=r*u/3,M=new Ys(T,s);this.geometries.push(M);const b=new vn(M,1);this.geometries.push(b);const P=new Ct(b,n);P.position.y=-o/2+o*u/3,P.rotation.x=Math.PI/2,c.add(P)}}update(t){this.isExploded?this.mesh.children.forEach((n,r)=>{const s=this.fragmentVelocities[r],o=this.fragmentRotations[r];s&&o&&(n.position.addScaledVector(s,t),n.rotation.x+=o.x*t,n.rotation.y+=o.y*t,n.rotation.z+=o.z*t)}):this.mesh.rotation.y+=t*.05}explode(){this.isExploded||(this.isExploded=!0,this.mesh.children.forEach(()=>{const t=new R((Math.random()-.5)*2,(Math.random()-.5)*2,(Math.random()-.5)*2).normalize().multiplyScalar(I.deathStarExplosion.fragmentVelocity);this.fragmentVelocities.push(t);const n=new R((Math.random()-.5)*2,(Math.random()-.5)*2,(Math.random()-.5)*2).multiplyScalar(I.deathStarExplosion.fragmentRotationSpeed);this.fragmentRotations.push(n)}))}dispose(){this.geometries.forEach(t=>t.dispose()),this.materials.forEach(t=>t.dispose()),this.geometries=[],this.materials=[];for(let t=this.mesh.children.length-1;t>=0;t--)this.mesh.remove(this.mesh.children[t])}}class om extends Nr{constructor(t,n){super();U(this,"phase",0);U(this,"deathStar",null);U(this,"toDeathStar",new R);U(this,"targetRotation",new wn);U(this,"forward",new R(0,0,-1));this.scene=t,this.onComplete=n,D.entityManager&&D.entityManager.setSpawningEnabled(!0)}get speed(){return this.phase===1?I.player.forwardSpeeds.SURFACE:I.player.forwardSpeeds.DOGFIGHT}get showStarField(){return!0}update(t,n,r){if(this.phase===0){const s=D.debugKillsThreshold??I.stages.dogfight.killsThreshold;D.kills>=s&&this.startApproach(n)}else this.updateApproach(t,n)}startApproach(t){this.phase=1,D.isApproachingDeathStar=!0,D.entityManager&&(D.entityManager.clear(),D.entityManager.setSpawningEnabled(!1));const r=new R(0,0,-1).applyQuaternion(t.mesh.quaternion).clone(),s=new R(0,1,0).applyQuaternion(t.mesh.quaternion),o=I.stages.deathStar.spawnAngle;r.applyAxisAngle(s,o);const a=t.position.clone().add(r.multiplyScalar(I.stages.deathStar.distance));this.deathStar=new El(a),this.scene.add(this.deathStar.mesh)}updateApproach(t,n){if(!this.deathStar)return;this.toDeathStar.subVectors(this.deathStar.position,n.position);const r=this.toDeathStar.length();if(r<I.stages.trench.transitionDistance+I.stages.deathStar.size){this.onComplete();return}r>0&&(this.toDeathStar.divideScalar(r),this.targetRotation.setFromUnitVectors(this.forward,this.toDeathStar),n.mesh.quaternion.slerp(this.targetRotation,I.stages.trench.steeringStrength*t)),this.deathStar.update(t)}cleanup(){D.isApproachingDeathStar=!1,this.deathStar&&(this.scene.remove(this.deathStar.mesh),this.deathStar.dispose(),this.deathStar=null)}}class lm extends jt{constructor(t){super();U(this,"mesh");U(this,"collisionBox");U(this,"_isExploded",!1);U(this,"topMesh");U(this,"fireCooldown",0);this.mesh=new Rt,this.mesh.position.copy(t),this.fireCooldown=Math.random()*I.fireball.fireRate;const{towerWidth:n,towerHeight:r,towerColor:s}=I.stages.surface,o=r*.7,a=r*.3,l=new kt(n,o,n),c=new kn({color:s,wireframe:!0}),h=new Qe(l,c);h.position.y=o/2,this.mesh.add(h);const d=new kt(n*.8,a,n*.8);this.topMesh=new Qe(d,c),this.topMesh.position.y=o+a/2,this.mesh.add(this.topMesh),this.collisionBox=new Xn,this.updateCollisionBox()}get isExploded(){return this._isExploded}set isExploded(t){this._isExploded=t,this.topMesh&&(this.topMesh.visible=!t)}get position(){return this.mesh.position}getWorldPosition(t){return this.mesh.updateWorldMatrix(!0,!1),this.mesh.getWorldPosition(t)}getScore(){return I.stages.surface.towerPoints}explode(){this.isExploded=!0}update(t,n,r,s){return this.isExploded?null:(this.fireCooldown-=t,this.fireCooldown<=0?(this.fireCooldown=I.fireball.fireRate,new R().subVectors(n,this.mesh.position).normalize()):null)}updateCollisionBox(){this.collisionBox.setFromObject(this.mesh)}checkCollision(t){return this.isExploded?!1:this.collisionBox.intersectsBox(t)}dispose(){this.mesh.traverse(t=>{t instanceof Qe&&(t.geometry.dispose(),t.material instanceof Kt&&t.material.dispose())})}}class cm extends jt{constructor(){super();U(this,"mesh");U(this,"towers",[]);U(this,"floor");U(this,"nextTowerSpawnTime",0);U(this,"elapsedTime",0);U(this,"collisionResult",{floorHit:!1,towerHit:null});this.mesh=new Rt,this.floor=new Rt,this.createFloor(),this.mesh.add(this.floor),this.nextTowerSpawnTime=0}createFloor(){const{gridSpacing:t,color:n,floorY:r}=I.stages.surface,{far:s}=I.camera,o=s+t*2,a=new hn({color:n,opacity:.5,transparent:!0}),l=[],c=o,h=-o,d=-o,f=o;for(let _=d;_<=f;_+=t)l.push(new R(_,0,c)),l.push(new R(_,0,h));for(let _=c;_>=h;_-=t)l.push(new R(d,0,_)),l.push(new R(f,0,_));const m=new lt().setFromPoints(l),g=new Ct(m,a);g.position.y=r,this.floor.add(g)}update(t,n,r,s){this.elapsedTime+=t;const o=n.z,a=I.stages.surface.gridSpacing;if(this.floor.position.x=Math.round(n.x/a)*a,this.floor.position.z=Math.round(n.z/a)*a,this.elapsedTime>=this.nextTowerSpawnTime){this.spawnTower(n.x,o,r);const{towerSpawnInterval:l}=I.stages.surface,c=l*(.8+Math.random()*.4);this.nextTowerSpawnTime=this.elapsedTime+c}for(let l=this.towers.length-1;l>=0;l--){const c=this.towers[l];if(c.mesh.position.z>o+I.stages.surface.towerCleanupDistance){this.removeTower(l,r);continue}if(!c.isExploded&&s){const h=c.update(t,n);if(h){const d=h.multiplyScalar(I.fireball.relativeSpeed);s(c.mesh.position.clone(),d)}}else c.update(t,n)}}spawnTower(t,n,r){const{width:s,floorY:o,towerSpawnDistance:a,towerMarginX:l}=I.stages.surface,c=n-a,h=s/2-l,d=t+(Math.random()*2-1)*h,f=new lm(new R(d,o,c));this.towers.push(f),this.mesh.add(f.mesh);const m=r||D.entityManager;m&&m.addTarget(f)}removeTower(t,n){const r=this.towers[t];if(r){const s=n||D.entityManager;s&&s.removeTarget(r),this.mesh.remove(r.mesh),r.dispose(),this.towers.splice(t,1)}}checkCollisions(t,n){const{floorY:r}=I.stages.surface;this.collisionResult.floorHit=n.y-1<r,this.collisionResult.towerHit=null;for(const s of this.towers)if(s.checkCollision(t)){this.collisionResult.towerHit=s;break}return this.collisionResult}getTowers(){return this.towers}dispose(){for(this.floor&&this.floor.traverse(t=>{(t instanceof Qe||t instanceof Ct)&&(t.geometry.dispose(),t.material instanceof Kt&&t.material.dispose())});this.towers.length>0;)this.removeTower(0)}}class hm extends Nr{constructor(t,n,r){super();U(this,"elapsedTime",0);U(this,"surface");U(this,"playerBox",new Xn);this.scene=t,this.onComplete=n,D.entityManager&&(D.entityManager.clear(),D.entityManager.setSpawningEnabled(!1));const s=D.player;s.position.set(0,0,0),s.mesh.quaternion.set(0,0,0,1),this.surface=r||new cm,this.scene.add(this.surface.mesh)}get speed(){return I.player.forwardSpeeds.SURFACE}getTowers(){return this.surface.getTowers()}getPlayerOptions(){return{lockUpright:!0,maxPitch:I.stages.surface.maxPitch,maxYaw:I.stages.surface.maxYaw}}update(t,n,r){this.elapsedTime+=t;const s=I.stages.surface.width/2;n.position.x=Ht.clamp(n.position.x,-s,s),n.position.y=Ht.clamp(n.position.y,I.stages.surface.floorY-I.stages.surface.floorClampBuffer,I.stages.surface.maxHeight),this.surface.update(t,n.position,D.entityManager||void 0,(c,h)=>{D.entityManager&&D.entityManager.spawnFireball(c,h)});const o=this.playerBox.setFromObject(n.mesh),{floorHit:a,towerHit:l}=this.surface.checkCollisions(o,n.position);a&&(zi(I.stages.surface.collisionDamage),n.position.y=I.stages.surface.floorY+I.stages.surface.floorBounce),l&&(zi(I.stages.surface.collisionDamage),l.isExploded=!0),this.elapsedTime>=I.stages.surface.duration&&this.onComplete()}cleanup(){this.scene.remove(this.surface.mesh),this.surface.dispose()}}class um extends jt{constructor(t,n=I.turret.meshSize,r=I.fireball.sparkleSize){super();U(this,"mesh");U(this,"swivelBody");U(this,"fireCooldown",Math.random()*1);U(this,"isExploded",!1);U(this,"pieceVelocities",[]);U(this,"fireballSize");U(this,"material");U(this,"scratchVector3",new R);this.mesh=new Rt,this.mesh.position.copy(t),this.fireballSize=r,this.material=new kn({color:I.turret.meshColor,wireframe:!0});const s=new kt(n*.8,n*.8,n*.2),o=new Qe(s,this.material);this.mesh.add(o),this.swivelBody=new Rt,this.mesh.add(this.swivelBody);const a=new kt(n*.8,n*.5,n*.8),l=new Qe(a,this.material);this.swivelBody.add(l);const c=new Vi(n/15,n/15,n*.8,8),h=new Qe(c,this.material);h.position.set(-n*.2,0,n*.4),h.rotation.x=Math.PI/2,this.swivelBody.add(h);const d=new Qe(c,this.material);d.position.set(n*.2,0,n*.4),d.rotation.x=Math.PI/2,this.swivelBody.add(d)}getWorldPosition(t){return this.mesh.updateWorldMatrix(!0,!1),this.mesh.getWorldPosition(t)}get position(){return this.mesh.position}explode(){this.isExploded||(this.isExploded=!0,this.material.color.setHex(16753920),this.mesh.children.forEach(()=>{const n=new R((Math.random()-.5)*20,Math.random()*20,(Math.random()-.5)*20);this.pieceVelocities.push(n)}))}update(t,n,r,s){if(this.isExploded)return this.mesh.children.forEach((c,h)=>{this.pieceVelocities[h]&&(c.position.addScaledVector(this.pieceVelocities[h],t),c.rotation.x+=t*2,c.rotation.y+=t*2)}),null;this.fireCooldown-=t,this.swivelBody.lookAt(n);const o=this.getWorldPosition(this.scratchVector3),a=o.distanceTo(n);return n.z>o.z&&a<I.turret.range&&this.fireCooldown<=0?(this.fireCooldown=I.turret.fireRate,new R().subVectors(n,o).normalize()):null}getScore(){return I.turret.points}getVelocity(t,n){return t.clone().multiplyScalar(n)}getFireballSize(){return this.fireballSize}dispose(){this.material.dispose(),this.mesh.traverse(t=>{t instanceof Qe&&t.geometry.dispose()})}}class dm extends jt{constructor(t=I.stages.trench.turretSize,n=I.stages.trench.fireballSize){super();U(this,"mesh");U(this,"turrets",[]);this.mesh=new Rt;const{width:r,height:s,length:o}=I.stages.trench,a=r/2,l=s/2,{verticalDetailSpacing:c,horizontalDetailSpacing:h,verticalDetailColor:d,horizontalDetailColor:f}=I.stages.trench,m=[],g=-a,_=a,p=-l,u=l;m.push(g,u,0,g,u,-o),m.push(g,p,0,g,p,-o),m.push(_,u,0,_,u,-o),m.push(_,p,0,_,p,-o);for(let w=0;w>=-o;w-=c)m.push(g,p,w,g,u,w),m.push(_,p,w,_,u,w);m.push(g,p,-o,_,p,-o),m.push(g,u,-o,_,u,-o),m.push(g,p,-o,g,u,-o),m.push(_,p,-o,_,u,-o);const T=new lt;T.setAttribute("position",new rt(m,3));const M=new Ct(T,new hn({color:d}));M.name="trench-grid-vertical",this.mesh.add(M);const b=[];for(let w=g+h;w<_;w+=h)b.push(w,p,0,w,p,-o);const P=new lt;P.setAttribute("position",new rt(b,3));const A=new Ct(P,new hn({color:f}));A.name="trench-grid-horizontal",this.mesh.add(A),this.addObstacles(t,n)}isValidCatwalkZ(t){const{catwalkStartZ:n,catwalkEndZ:r}=I.stages.trench;return t<=n&&t>r}getCatwalkY(t){const{catwalkSpacing:n,catwalkYOffset:r}=I.stages.trench;return Math.abs(t)%(n*2)===0?r:-r}addObstacles(t,n){const{catwalkStartZ:r,catwalkEndZ:s,catwalkSpacing:o,catwalkDepth:a,width:l,exhaustPortZOffset:c,height:h,catwalkColor:d}=I.stages.trench,f=new kt(l,10,a),m=new vn(f),g=new hn({color:d});for(let A=r;A>s;A-=o){const w=new Ct(m,g);w.name="catwalk";const q=this.getCatwalkY(A);w.position.set(0,q,A),this.mesh.add(w)}const{spacing:_}=I.turret,p=l/2;for(let A=r;A>s;A-=_){const w=Math.floor(Math.abs(A)/_)%2===0,q=w?-p:p,x=(Math.abs(A)/_%3-1)*h*.25,y=new um(new R(q,x,A),t,n);w?y.mesh.rotation.y=Math.PI/2:y.mesh.rotation.y=-Math.PI/2,this.turrets.push(y),this.mesh.add(y.mesh)}f.dispose();const{exhaustPortColor:u}=I.stages.trench,T=new kt(20,20,20),M=new vn(T),b=new hn({color:u}),P=new Ct(M,b);P.name="exhaust-port",P.position.set(0,-h/2+10,s-c),this.mesh.add(P),T.dispose()}checkObstacleCollision(t){const{catwalkStartZ:n,catwalkEndZ:r,catwalkSpacing:s,catwalkCollisionThreshold:o,catwalkHeightThreshold:a}=I.stages.trench,l=t.z,c=t.y;if(l>n+o||l<r-o)return null;const h=Math.round(l/s)*s;if(!this.isValidCatwalkZ(h))return null;if(Math.abs(l-h)<o){const d=this.getCatwalkY(h);if(Math.abs(c-d)<a)return h}return null}checkPortCollision(t){const{catwalkEndZ:n,exhaustPortZOffset:r,height:s}=I.stages.trench,o=n-r,a=-s/2+10,l=0,h=20/2;return Math.abs(t.x-l)<h+5&&Math.abs(t.y-a)<h+5&&Math.abs(t.z-o)<h+5}getTurrets(){return this.turrets}update(t){}dispose(){this.turrets.forEach(t=>t.dispose()),this.mesh.traverse(t=>{(t instanceof Qe||t instanceof Ct||t instanceof _l)&&(t.geometry.dispose(),t.material instanceof Kt?t.material.dispose():Array.isArray(t.material)&&t.material.forEach(n=>n.dispose()))})}}class fm extends Nr{constructor(t,n,r){super();U(this,"trench");U(this,"lastCatwalkHitZ",null);this.scene=t,this.onComplete=n,this.onReset=r,D.entityManager&&(D.entityManager.clear(),D.entityManager.setSpawningEnabled(!1));const s=D.player;s.position.set(0,0,0),s.mesh.quaternion.set(0,0,0,1);const o=D.debugTurretSize??I.stages.trench.turretSize,a=D.debugFireballSize??I.stages.trench.fireballSize;this.trench=new dm(o,a),this.scene.add(this.trench.mesh),D.entityManager&&this.trench.getTurrets().forEach(l=>{D.entityManager.addTarget(l)})}get speed(){return I.player.forwardSpeeds.TRENCH}getTurrets(){return this.trench.getTurrets()}getPlayerOptions(){return{lockUpright:!0,maxPitch:I.stages.trench.maxPitch,maxYaw:I.stages.trench.maxYaw}}update(t,n,r){const s=I.stages.trench.width/2,o=I.stages.trench.height/2;n.position.x=Ht.clamp(n.position.x,-s,s),n.position.y=Ht.clamp(n.position.y,-o,o);const a=this.trench.checkObstacleCollision(n.position);a!==null?a!==this.lastCatwalkHitZ&&(zi(1),this.lastCatwalkHitZ=a):this.lastCatwalkHitZ=null,this.trench.update(t);const l=this.trench.checkPortCollision(n.position);let c=!1,h=!1;D.entityManager&&D.entityManager.getTorpedoes().forEach(d=>{d.isExploded||(this.trench.checkPortCollision(d.position)?(c=!0,d.explode()):(this.trench.checkObstacleCollision(d.position)!==null||d.position.z<=-I.stages.trench.length)&&(d.explode(),h=!0))}),c?(Ns(I.torpedo.bonusPoints),this.onComplete()):(h||l||n.position.z<=-I.stages.trench.length)&&(zi(1),this.onReset())}cleanup(){D.entityManager&&this.trench.getTurrets().forEach(t=>{D.entityManager.removeTarget(t)}),this.scene.remove(this.trench.mesh),this.trench.dispose()}}class pm extends Nr{constructor(t){super();U(this,"deathStar");U(this,"elapsedTime",0);U(this,"hasExploded",!1);U(this,"camera",null);this.scene=t,D.entityManager&&(D.entityManager.clear(),D.entityManager.setSpawningEnabled(!1)),this.deathStar=new El(new R(0,0,0)),this.scene.add(this.deathStar.mesh);const n=D.player;n.position.set(0,0,200),n.mesh.quaternion.setFromEuler(new Tn(0,Math.PI,0))}get speed(){return I.explosionStage.escapeSpeed}get showStarField(){return!0}get showTitle(){return!1}update(t,n,r){if(this.camera=r,this.elapsedTime+=t,r.position.set(0,5,-50),r.lookAt(this.deathStar.position),!this.hasExploded&&this.elapsedTime>=I.explosionStage.shatterDelay&&(this.deathStar.explode(),this.hasExploded=!0,D.isDeathStarDestroyed=!0,D.entityManager))for(let s=0;s<I.deathStarExplosion.particleCount;s++){const o=new R((Math.random()-.5)*I.stages.deathStar.size*2,(Math.random()-.5)*I.stages.deathStar.size*2,(Math.random()-.5)*I.stages.deathStar.size*2),a=o.clone().normalize().multiplyScalar(I.deathStarExplosion.fragmentVelocity*(.5+Math.random()));D.entityManager.spawnFireball(o,a)}this.deathStar.update(t),this.elapsedTime>=I.explosionStage.duration&&Mm()}cleanup(){if(this.camera){const{position:t}=I.camera;this.camera.position.set(t.x,t.y,t.z),this.camera.quaternion.set(0,0,0,1)}this.scene.remove(this.deathStar.mesh),this.deathStar.dispose(),D.isDeathStarDestroyed=!1,D.player&&(D.player.position.set(0,0,0),D.player.mesh.quaternion.set(0,0,0,1))}}class mm{constructor(e){U(this,"currentStage",null);this.worldScene=e,this.initStage()}initStage(){D.hasFiredTorpedo=!1,D.canFireTorpedo=!1;const e=()=>this.goToNextStage(),t=()=>this.reset();switch(D.stage){case"DOGFIGHT":this.currentStage=new om(this.worldScene,e);break;case"SURFACE":this.currentStage=new hm(this.worldScene,e);break;case"TRENCH":this.currentStage=new fm(this.worldScene,e,t);break;case"EXPLOSION":this.currentStage=new pm(this.worldScene);break}}setStageInstance(e){this.currentStage&&this.currentStage.cleanup(),this.currentStage=e}setStage(e){D.stage=e,D.kills=0,this.reset()}getStage(){return this.currentStage}update(e,t,n){this.currentStage&&this.currentStage.update(e,t,n)}goToNextStage(){const e=D.wave===1?I.progression.wave1:I.progression.default,t=e.indexOf(D.stage);t!==-1&&t<e.length-1?D.stage=e[t+1]:(D.wave++,D.shields=Math.min(I.player.maxShields,D.shields+1),D.stage=e[0]),D.kills=0,this.reset()}checkExhaustPortHit(e,t){if(!D.player)return!1;const{catwalkEndZ:n,exhaustPortZOffset:r,height:s}=I.stages.trench,o=n-r,a=-s/2+10,l=new R(0,a,o);return Math.abs(D.player.position.z-o)>I.torpedo.range?!1:Ml(l,e,t)}reset(){this.currentStage&&this.currentStage.cleanup(),this.initStage()}destroy(){this.currentStage&&this.currentStage.cleanup()}}const Fo=typeof window<"u"?window.innerWidth:1024,No=typeof window<"u"?window.innerHeight:768,D={score:0,shields:I.player.maxShields,kills:0,wave:1,stage:"DOGFIGHT",isGameOver:!1,player:null,entityManager:null,stageManager:null,viewport:{width:Fo,height:No,centerX:Fo/2,centerY:No/2},gunColorToggles:I.laser.offsets.map(()=>!1),debug:!1,isSmartAI:!0,isModeColoring:!1,showChassis:!1,canFireTorpedo:!1,hasFiredTorpedo:!1,isApproachingDeathStar:!1,isDeathStarDestroyed:!1,debugKillsThreshold:void 0,debugTurretSize:void 0,debugFireballSize:void 0};function gm(i,e){const t=new URLSearchParams(window.location.search);D.debug=t.get("debug")==="true",D.score=0,D.shields=I.player.maxShields,D.kills=0,D.wave=1,D.stage="DOGFIGHT",D.isGameOver=!1,D.gunColorToggles=I.laser.offsets.map(()=>!1),D.canFireTorpedo=!1,D.hasFiredTorpedo=!1,D.isApproachingDeathStar=!1,D.isDeathStarDestroyed=!1,D.debugKillsThreshold=void 0,D.debugTurretSize=void 0,D.debugFireballSize=void 0,D.player=new tm,D.stageManager&&D.stageManager.destroy(),D.stageManager=new mm(i),D.entityManager&&D.entityManager.clear(),D.entityManager=new am(i,e),D.entityManager.spawnTieFighter(D.isSmartAI),console.log("Game initialized",{debug:D.debug,stage:D.stage})}function _m(i,e,t={x:0,y:0,isFiring:!1}){var o,a;if(D.isGameOver||!D.player||!D.entityManager||!D.stageManager)return;const n=((o=D.stageManager.getStage())==null?void 0:o.speed)??I.player.baseForwardSpeed,r=D.stage==="EXPLOSION"?{x:0,y:0,isFiring:!1}:t,s=(a=D.stageManager.getStage())==null?void 0:a.getPlayerOptions();D.player.update(r,i,n,D.showChassis,s),e.updateMatrixWorld(),D.entityManager.update(i,D.player.position,D.player.mesh.quaternion,D.isSmartAI,e,n,D.stage==="EXPLOSION"?void 0:l=>zi(l)),D.stageManager.update(i,D.player,e)}function Ms(i){D.stageManager?D.stageManager.setStage(i):(D.stage=i,D.kills=0)}function vm(i){if(!D.entityManager)return[];const e=[],t=I.laser.offsets.map((o,a)=>a);for(let o=t.length-1;o>0;o--){const a=Math.floor(Math.random()*(o+1));[t[o],t[a]]=[t[a],t[o]]}const n=Math.min(2,t.length),r=Math.floor(Math.random()*(t.length-n+1))+n;return t.slice(0,r).forEach(o=>{const a=D.gunColorToggles[o],l=a?I.laser.alternateColor:I.laser.color;D.gunColorToggles[o]=!a;const c=I.laser.offsets[o],h=new Se(c.x,c.y),d=new Se(i.x,i.y),f=D.entityManager.spawnLaser(h,d,l);e.push(f)}),e}function xm(i,e){return D.entityManager?D.entityManager.spawnTorpedo(i,e):null}function Ns(i){D.score+=i}function Sm(){D.kills++}function zi(i=1){D.shields-=i,D.shields<=0&&(D.isGameOver=!0)}function Mm(){D.stageManager&&D.stageManager.goToNextStage()}function Em(i,e){e.mesh.add(i);const{position:t,lookAt:n}=I.camera;i.position.set(t.x,t.y,t.z),i.lookAt(n.x,n.y,n.z)}function ym(){const i=new Eo;i.background=new ke(I.camera.backgroundColor);const e=new zt(I.camera.fov,D.viewport.width/D.viewport.height,I.camera.near,I.camera.far),t=new Eo,n=new ll(-1,1,1,-1,0,1),r=new ml({antialias:!0});r.setSize(D.viewport.width,D.viewport.height),r.autoClear=!1,document.body.appendChild(r.domElement);const s=()=>{D.viewport.width=window.innerWidth,D.viewport.height=window.innerHeight,D.viewport.centerX=D.viewport.width/2,D.viewport.centerY=D.viewport.height/2,e.aspect=D.viewport.width/D.viewport.height,e.updateProjectionMatrix(),r.setSize(D.viewport.width,D.viewport.height)};window.addEventListener("resize",s);const o=()=>{window.removeEventListener("resize",s),document.body.contains(r.domElement)&&document.body.removeChild(r.domElement),r.dispose()};return console.log("Renderer initialized"),{scene:i,camera:e,hudScene:t,hudCamera:n,renderer:r,cleanup:o}}function Tm(i,e,t,n,r){i.clear(),i.render(e,t),n&&r&&i.render(n,r)}class bm{constructor(){U(this,"input",new Se(0,0));U(this,"keyboardInput",new Se(0,0));U(this,"keyboardTarget",new Se(0,0));U(this,"pointerInput",new Se(0,0));U(this,"keys",new Set);U(this,"isDragging",!1);U(this,"dragTouchId",null);U(this,"dragStartedOnFireButton",!1);U(this,"isFiring",!1);U(this,"useRelativeInput",!1);U(this,"pointerAnchor",new Se(0,0));U(this,"fireButton",null);U(this,"handleKeyDown",e=>{e.code==="Space"&&(this.isFiring=!0),this.keys.add(e.code),this.updateKeyboardTarget()});U(this,"handleKeyUp",e=>{e.code==="Space"&&(this.isFiring=!1),this.keys.delete(e.code),this.updateKeyboardTarget()});U(this,"handleMouseDown",e=>{const t=e.target;t!==this.fireButton&&t.tagName!=="CANVAS"&&t!==document.body&&t!==document.documentElement||(e.button===2?this.startDrag(e.clientX,e.clientY,null,!1,!1):(this.isFiring=!0,this.startDrag(e.clientX,e.clientY,null,t===this.fireButton,!1)))});U(this,"handlePointerUp",e=>{e.button===2?this.isDragging=!1:(this.isDragging=!1,this.isFiring=!1)});U(this,"handleContextMenu",e=>{e.preventDefault()});U(this,"handleMouseMove",e=>{this.isDragging&&this.updatePointerInput(e.clientX,e.clientY)});U(this,"handleTouchStart",e=>{for(let t=0;t<e.changedTouches.length;t++){const n=e.changedTouches[t],r=n.target,s=r===this.fireButton;s&&(this.isFiring=!0,e.preventDefault()),!(!s&&r.tagName!=="CANVAS"&&r!==document.body&&r!==document.documentElement)&&(this.isDragging?this.dragStartedOnFireButton&&!s&&this.startDrag(n.clientX,n.clientY,n.identifier,!1,!0):this.startDrag(n.clientX,n.clientY,n.identifier,s,!0))}});U(this,"handleTouchEnd",e=>{for(let t=0;t<e.changedTouches.length;t++){const n=e.changedTouches[t];n.target===this.fireButton&&(this.isFiring=!1),this.dragTouchId===n.identifier&&(this.isDragging=!1,this.dragTouchId=null)}});U(this,"handleTouchMove",e=>{if(!(!this.isDragging||this.dragTouchId===null))for(let t=0;t<e.touches.length;t++){const n=e.touches[t];if(n.identifier===this.dragTouchId){this.updatePointerInput(n.clientX,n.clientY),e.preventDefault();break}}})}updatePointerInput(e,t){let n,r;if(this.useRelativeInput){const s=e-this.pointerAnchor.x,o=this.pointerAnchor.y-t;n=s/I.input.touchRadius,r=o/I.input.touchRadius}else{const{centerX:s,centerY:o}=D.viewport;n=(e-s)/s,r=(o-t)/o}this.pointerInput.set(Ht.clamp(n,-1,1),Ht.clamp(r,-1,1))}updateKeyboardTarget(){let e=0,t=0;(this.keys.has("ArrowLeft")||this.keys.has("KeyA"))&&(e-=1),(this.keys.has("ArrowRight")||this.keys.has("KeyD"))&&(e+=1),(this.keys.has("ArrowUp")||this.keys.has("KeyW"))&&(t+=1),(this.keys.has("ArrowDown")||this.keys.has("KeyS"))&&(t-=1),this.keyboardTarget.set(e,t)}startDrag(e,t,n,r,s){this.isDragging=!0,this.dragTouchId=n,this.dragStartedOnFireButton=r,this.useRelativeInput=s,s?(this.pointerAnchor.set(e,t),this.pointerInput.set(0,0)):this.updatePointerInput(e,t)}setup(){this.fireButton=document.getElementById("fire-button"),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),window.addEventListener("mousedown",this.handleMouseDown),window.addEventListener("mouseup",this.handlePointerUp),window.addEventListener("contextmenu",this.handleContextMenu),window.addEventListener("mousemove",this.handleMouseMove),window.addEventListener("touchstart",this.handleTouchStart,{passive:!1}),window.addEventListener("touchend",this.handleTouchEnd,{passive:!1}),window.addEventListener("touchcancel",this.handleTouchEnd,{passive:!1}),window.addEventListener("touchmove",this.handleTouchMove,{passive:!1})}teardown(){window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),window.removeEventListener("mousedown",this.handleMouseDown),window.removeEventListener("mouseup",this.handlePointerUp),window.removeEventListener("contextmenu",this.handleContextMenu),window.removeEventListener("mousemove",this.handleMouseMove),window.removeEventListener("touchstart",this.handleTouchStart),window.removeEventListener("touchend",this.handleTouchEnd),window.removeEventListener("touchcancel",this.handleTouchEnd),window.removeEventListener("touchmove",this.handleTouchMove)}update(e){const t=I.input.sensitivity*e;if(this.keyboardInput.x=this.moveTowards(this.keyboardInput.x,this.keyboardTarget.x,t),this.keyboardInput.y=this.moveTowards(this.keyboardInput.y,this.keyboardTarget.y,t),!this.isDragging){const n=this.pointerInput.length();if(n>1e-6){const r=I.input.centeringSpeed*e,s=Math.max(0,n-r);this.pointerInput.multiplyScalar(s/n)}else this.pointerInput.set(0,0)}this.input.set(Ht.clamp(this.keyboardInput.x+this.pointerInput.x,-1,1),Ht.clamp(this.keyboardInput.y+this.pointerInput.y,-1,1))}moveTowards(e,t,n){return Math.abs(t-e)<=n?t:e+Math.sign(t-e)*n}getInput(){return{x:this.input.x,y:this.input.y,isFiring:this.isFiring}}}class wm extends jt{constructor(){super();U(this,"points");U(this,"geometry");U(this,"material");this.geometry=new lt;const t=new Float32Array(I.starField.numStars*3);for(let n=0;n<I.starField.numStars;n++)t[n*3]=(Math.random()-.5)*I.starField.fieldSize,t[n*3+1]=(Math.random()-.5)*I.starField.fieldSize,t[n*3+2]=(Math.random()-.5)*I.starField.fieldSize;this.geometry.setAttribute("position",new Vt(t,3)),this.material=new vl({color:I.starField.starColor,size:I.starField.starSize}),this.points=new em(this.geometry,this.material),this.points.frustumCulled=!1}update(t){const n=this.geometry.attributes.position.array,r=I.starField.fieldSize/2;for(let s=0;s<I.starField.numStars;s++){const o=s*3,a=s*3+1,l=s*3+2;n[o]-t.x>r?n[o]-=I.starField.fieldSize:n[o]-t.x<-r&&(n[o]+=I.starField.fieldSize),n[a]-t.y>r?n[a]-=I.starField.fieldSize:n[a]-t.y<-r&&(n[a]+=I.starField.fieldSize),n[l]-t.z>r?n[l]-=I.starField.fieldSize:n[l]-t.z<-r&&(n[l]+=I.starField.fieldSize)}this.geometry.attributes.position.needsUpdate=!0}}class Am{constructor(){U(this,"element");this.element=document.getElementById("cursor")}update(e){if(!this.element)return;const{centerX:t,centerY:n}=D.viewport,r=t+e.x*t,s=n-e.y*n;this.element.style.transform=`translate3d(calc(${r}px - 50%), calc(${s}px - 50%), 0)`,this.element.style.display!=="block"&&(this.element.style.display="block")}}const Ii=class Ii{constructor(){U(this,"hud");U(this,"scoreValue");U(this,"shieldValue");U(this,"shieldBar");U(this,"waveValue");U(this,"stageValue");U(this,"distanceValue");U(this,"instructionValue");U(this,"destructionValue");U(this,"greatShotValue");U(this,"torpedoReadyValue");U(this,"gameOver");U(this,"debugPanel");U(this,"damageOverlay");U(this,"restartButton");U(this,"stageButtons");U(this,"lastShields");U(this,"lastIsGameOver",!1);U(this,"lastStage","");U(this,"lastIsDeathStarDestroyed",!1);U(this,"damageTimeout",null);U(this,"shieldTimeout",null);U(this,"destructionTimeout",null);U(this,"stageTimeout",null);U(this,"instructionTimeout",null);U(this,"greatShotTimeout",null);U(this,"firstUpdate",!0);U(this,"tieFighterCountValue");this.lastShields=I.player.maxShields,document.documentElement.style.setProperty("--ui-damage-flash-duration",`${I.ui.damageFlashDuration/1e3}s`),this.hud=this.createEl("div","fixed inset-0 pointer-events-none z-10 font-retro font-bold flex flex-col justify-between p-4"),this.hud.id="hud";const e=this.createEl("div","flex justify-between items-start w-full relative z-10",this.hud);this.createScoreSection(e),this.createShieldSection(e),this.createWaveSection(e);const t=this.createEl("div","fixed top-1/4 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 pointer-events-none",this.hud);this.stageValue=this.createEl("div","text-vector-yellow text-4xl animate-pulse hidden",t),this.distanceValue=this.createEl("div","text-vector-red text-2xl font-bold hidden",t),this.distanceValue.id="distance-value",this.destructionValue=this.createEl("div","text-vector-red text-3xl font-bold text-center hidden animate-pulse",t),this.destructionValue.id="destruction-value",this.destructionValue.textContent="DEATH STAR DESTROYED",this.greatShotValue=this.createEl("div","text-vector-yellow text-2xl font-bold text-center hidden",t),this.greatShotValue.id="great-shot-value",this.greatShotValue.textContent="GREAT SHOT KID!",this.instructionValue=this.createEl("div","text-vector-green text-xl text-center hidden",t),this.torpedoReadyValue=this.createEl("div","text-vector-red text-2xl font-bold hidden animate-pulse",t),this.torpedoReadyValue.textContent="TORPEDO READY",this.createGameOverOverlay(),this.damageOverlay=this.createEl("div","fixed inset-0 bg-vector-red opacity-0 pointer-events-none z-50",this.hud),this.damageOverlay.id="damage-overlay",D.debug&&this.createDebugPanel(),document.body.appendChild(this.hud)}createDebugPanel(){this.debugPanel=this.createEl("div","fixed bottom-4 left-4 pointer-events-auto bg-black bg-opacity-70 border border-vector-green p-4 flex flex-col space-y-2 text-vector-green font-retro font-bold text-xs z-20",document.body),this.debugPanel.id="debug-panel";const e=this.createEl("div","flex justify-between items-center mb-2 border-b border-vector-green pb-1",this.debugPanel),t=this.createEl("div","",e);t.textContent="DEBUG CONSOLE";const n=this.createEl("button","ml-4 hover:text-white transition-colors font-retro",e);n.id="debug-minimize-toggle",n.textContent="[-]";const r=this.createEl("div","flex flex-col space-y-2",this.debugPanel);r.id="debug-panel-content",n.onclick=()=>{var _;const g=r.classList.toggle("hidden");n.textContent=g?"[+]":"[-]",(_=this.debugPanel)==null||_.classList.toggle("debug-minimized",g),e.classList.toggle("mb-2",!g),e.classList.toggle("border-b",!g),e.classList.toggle("pb-1",!g)};const s=this.createEl("div","mb-2 border-b border-vector-green pb-1",r);s.textContent="STATS";const o=this.createEl("div","flex justify-between",r);this.createEl("span","",o).textContent="TIE FIGHTERS:",this.tieFighterCountValue=this.createEl("span","",o),this.tieFighterCountValue.id="debug-tie-fighter-count",this.tieFighterCountValue.textContent="0",this.createToggleButton("ai-mode-toggle",()=>`AI: ${D.isSmartAI?"SMART":"DUMB"}`,()=>{D.isSmartAI=!D.isSmartAI},r),this.createToggleButton("mode-coloring-toggle",()=>`COLORS: ${D.isModeColoring?"ON":"OFF"}`,()=>{D.isModeColoring=!D.isModeColoring},r),this.createToggleButton("chassis-toggle",()=>`CHASSIS: ${D.showChassis?"ON":"OFF"}`,()=>{D.showChassis=!D.showChassis},r),this.createEl("div","mt-4 mb-2 border-b border-vector-green pb-1",r).textContent="STAGE SWITCHER";const a=this.createEl("div","flex space-x-2",r);this.stageButtons=new Map;const l=this.createActionButton("stage-dogfight","DOGFIGHT",()=>{Ms("DOGFIGHT")},a);this.stageButtons.set("DOGFIGHT",l);const c=this.createActionButton("stage-surface","SURFACE",()=>{Ms("SURFACE")},a);this.stageButtons.set("SURFACE",c);const h=this.createActionButton("stage-trench","TRENCH",()=>{Ms("TRENCH")},a);this.stageButtons.set("TRENCH",h),this.updateStageButtons(D.stage),this.createEl("div","mt-4 mb-2 border-b border-vector-green pb-1",r).textContent="KILLS TO ADVANCE";const d=this.createEl("input","w-full bg-black text-vector-green border border-vector-green px-2 py-1",r);d.id="debug-kills-input",d.type="number",d.min="0",d.placeholder=`Default (${I.stages.dogfight.killsThreshold})`,D.debugKillsThreshold!==void 0&&(d.value=D.debugKillsThreshold.toString()),d.onchange=g=>{const _=parseInt(g.target.value);isNaN(_)?D.debugKillsThreshold=void 0:D.debugKillsThreshold=Math.max(0,_)},this.createEl("div","mt-4 mb-2 border-b border-vector-green pb-1",r).textContent="TURRET SIZE";const f=this.createEl("input","w-full bg-black text-vector-green border border-vector-green px-2 py-1",r);f.id="debug-turret-size-input",f.type="number",f.min="1",f.step="1",f.placeholder=`Default (${I.turret.meshSize})`,D.debugTurretSize!==void 0&&(f.value=D.debugTurretSize.toString()),f.onchange=g=>{const _=parseFloat(g.target.value);isNaN(_)?D.debugTurretSize=void 0:D.debugTurretSize=Math.max(1,_)},this.createEl("div","mt-4 mb-2 border-b border-vector-green pb-1",r).textContent="FIREBALL SIZE";const m=this.createEl("input","w-full bg-black text-vector-green border border-vector-green px-2 py-1",r);m.id="debug-fireball-size-input",m.type="number",m.min="1",m.step="1",m.placeholder=`Default (${I.fireball.sparkleSize})`,D.debugFireballSize!==void 0&&(m.value=D.debugFireballSize.toString()),m.onchange=g=>{const _=parseFloat(g.target.value);isNaN(_)?D.debugFireballSize=void 0:D.debugFireballSize=Math.max(1,_)}}createToggleButton(e,t,n,r){const s=this.createEl("button",Ii.BUTTON_CLASSES,r);return s.id=e,s.textContent=t(),s.onclick=()=>{n(),s.textContent=t()},s}createActionButton(e,t,n,r){const s=this.createEl("button",Ii.BUTTON_CLASSES,r);return s.id=e,s.textContent=t,s.onclick=()=>{n()},s}updateStageButtons(e){this.stageButtons&&this.stageButtons.forEach((t,n)=>{n===e?(t.classList.add("bg-vector-green","text-black"),t.classList.remove("hover:bg-vector-green","hover:text-black")):(t.classList.remove("bg-vector-green","text-black"),t.classList.add("hover:bg-vector-green","hover:text-black"))})}createEl(e,t,n){const r=document.createElement(e);return r.className=t,n&&n.appendChild(r),r}createScoreSection(e){const t=this.createEl("div","flex flex-col",e),n=this.createEl("div","flex space-x-2",t);this.createEl("span","text-vector-red",n).textContent="SCORE",this.scoreValue=this.createEl("span","text-vector-green",n),this.scoreValue.id="score-value",this.scoreValue.textContent="0";const r=this.createEl("div","flex space-x-2 text-sm",t);this.createEl("span","text-vector-yellow",r).textContent="HI-SCORE";const s=this.createEl("span","text-vector-yellow",r);s.id="high-score-value",s.textContent=I.ui.highScore.toString()}createShieldSection(e){const t=this.createEl("div","flex flex-col items-center",e),n=this.createEl("div","flex space-x-2",t);this.createEl("span","text-vector-green",n).textContent="SHIELD",this.shieldValue=this.createEl("span","text-vector-green",n),this.shieldValue.id="shield-value",this.shieldValue.textContent=I.player.maxShields.toString();const r=this.createEl("div","w-48 h-4 border border-vector-green mt-1",t);this.shieldBar=this.createEl("div","h-full bg-vector-green transition-all duration-300",r),this.shieldBar.id="shield-bar",this.shieldBar.style.width="100%"}createWaveSection(e){const t=this.createEl("div","flex space-x-2",e);this.createEl("span","text-vector-red",t).textContent="WAVE",this.waveValue=this.createEl("span","text-vector-green",t),this.waveValue.id="wave-value",this.waveValue.textContent="1"}createGameOverOverlay(){this.gameOver=this.createEl("div","fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 hidden z-50 pointer-events-auto",this.hud),this.gameOver.id="game-over";const e=this.createEl("div","text-vector-red text-6xl font-retro animate-pulse mb-8",this.gameOver);e.textContent="GAME OVER";const t=this.createEl("button","px-8 py-3 border-2 border-vector-green text-vector-green hover:bg-vector-green hover:text-black font-retro text-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-vector-green focus:ring-offset-2 focus:ring-offset-black",this.gameOver);t.textContent="RESTART MISSION",t.setAttribute("aria-label","Restart Game"),t.onclick=()=>window.location.reload(),this.restartButton=t}destroy(){var e;this.hud.remove(),(e=this.debugPanel)==null||e.remove(),this.damageTimeout&&clearTimeout(this.damageTimeout),this.shieldTimeout&&clearTimeout(this.shieldTimeout),this.destructionTimeout&&clearTimeout(this.destructionTimeout),this.stageTimeout&&clearTimeout(this.stageTimeout),this.instructionTimeout&&clearTimeout(this.instructionTimeout),this.greatShotTimeout&&clearTimeout(this.greatShotTimeout)}update(e){var t,n;if(this.scoreValue.textContent!==e.score.toString()&&(this.scoreValue.textContent=e.score.toString()),this.shieldValue.textContent!==e.shields.toString()){!this.firstUpdate&&e.shields<this.lastShields&&this.triggerDamageFX(),this.lastShields=e.shields,this.shieldValue.textContent=e.shields.toString();const r=e.shields/I.player.maxShields*100;this.shieldBar.style.width=`${Math.max(0,r)}%`}if(this.waveValue.textContent!==e.wave.toString()&&(this.waveValue.textContent=e.wave.toString()),e.isDeathStarDestroyed&&!this.lastIsDeathStarDestroyed&&(this.destructionValue.classList.remove("hidden"),this.destructionTimeout&&clearTimeout(this.destructionTimeout),this.destructionTimeout=window.setTimeout(()=>{this.destructionValue.classList.add("hidden"),this.destructionTimeout=null},4e3)),this.lastIsDeathStarDestroyed=e.isDeathStarDestroyed,this.lastStage!==e.stage){this.lastStage=e.stage;const r=(t=e.stageManager)==null?void 0:t.getStage();switch(((r==null?void 0:r.showTitle)??!0)&&(this.stageValue.textContent=`STAGE: ${e.stage}`,this.stageValue.classList.remove("hidden"),this.stageTimeout&&clearTimeout(this.stageTimeout),this.stageTimeout=window.setTimeout(()=>{this.stageValue.classList.add("hidden"),this.stageTimeout=null},3e3)),this.instructionTimeout&&clearTimeout(this.instructionTimeout),this.greatShotTimeout&&(clearTimeout(this.greatShotTimeout),this.greatShotTimeout=null,this.greatShotValue.classList.add("hidden")),e.stage){case"DOGFIGHT":this.instructionValue.textContent="CLEAR THE SECTOR OF TIE FIGHTERS",this.instructionValue.classList.remove("hidden");break;case"SURFACE":this.instructionValue.textContent="FLY TO THE TRENCH",this.instructionValue.classList.remove("hidden");break;case"TRENCH":this.instructionValue.textContent="STAY LOW AND AIM AT THE PORT TO AUTO-FIRE TORPEDOES",this.instructionValue.classList.remove("hidden");break;case"EXPLOSION":this.greatShotValue.classList.remove("hidden"),this.greatShotTimeout&&clearTimeout(this.greatShotTimeout),this.greatShotTimeout=window.setTimeout(()=>{this.greatShotValue.classList.add("hidden"),this.greatShotTimeout=null},3e3);break}this.instructionTimeout=window.setTimeout(()=>{this.instructionValue.classList.add("hidden"),this.instructionTimeout=null},5e3)}if(e.stage==="TRENCH"&&e.player){const{catwalkEndZ:r,exhaustPortZOffset:s}=I.stages.trench,o=r-s,a=Math.max(0,Math.floor(Math.abs(e.player.position.z-o)));a<4e3?(this.distanceValue.textContent=a.toString().padStart(4,"0"),this.distanceValue.classList.remove("hidden")):this.distanceValue.classList.add("hidden")}else this.distanceValue.classList.add("hidden");e.isGameOver?(this.gameOver.classList.remove("hidden"),this.lastIsGameOver||(this.gameOver.classList.add("animate-fade-in"),(n=this.restartButton)==null||n.focus())):(this.gameOver.classList.add("hidden"),this.gameOver.classList.remove("animate-fade-in")),this.lastIsGameOver=e.isGameOver,this.stageButtons&&this.updateStageButtons(e.stage),this.tieFighterCountValue&&e.entityManager&&(this.tieFighterCountValue.textContent=e.entityManager.getTieFighters().length.toString()),e.stage==="TRENCH"&&e.canFireTorpedo?this.torpedoReadyValue.classList.remove("hidden"):this.torpedoReadyValue.classList.add("hidden"),e.isApproachingDeathStar?(this.instructionValue.textContent="APPROACH DEATH STAR",this.instructionValue.classList.remove("hidden")):this.lastStage===e.stage&&this.instructionValue.textContent==="APPROACH DEATH STAR"&&this.instructionValue.classList.add("hidden"),this.firstUpdate=!1}retriggerAnimation(e,t,n,r){n&&clearTimeout(n),e.classList.remove(t),e.offsetWidth,e.classList.add(t);const s=window.setTimeout(()=>{e.classList.remove(t)},I.ui.damageFlashDuration+100);r&&r(s)}triggerDamageFX(){this.retriggerAnimation(this.damageOverlay,"animate-damage-flash",this.damageTimeout,e=>this.damageTimeout=e),this.retriggerAnimation(this.shieldBar,"animate-shield-impact",this.shieldTimeout,e=>this.shieldTimeout=e)}};U(Ii,"BUTTON_CLASSES","px-2 py-1 border border-vector-green hover:bg-vector-green hover:text-black transition-colors font-retro");let Os=Ii;class Ks{constructor(e){U(this,"fireCooldown",0);U(this,"laserPos2D",new Se);U(this,"fbPos2D",new Se);U(this,"tempVector3",new R);U(this,"scratchCameraPos",new R);U(this,"config");this.config=e}update(e,t,n){this.fireCooldown-=e,t.isFiring&&this.fireCooldown<=0&&(this.fire(t,n),this.fireCooldown=this.config.fireCooldown),this.updateLasers(n),this.updateSpecial(e,t,n)}fire(e,t){vm(e),this.checkHits(e,t)}checkTargets(e,t){if(!D.entityManager)return;let n=null,r=1/0;t.getWorldPosition(this.scratchCameraPos);for(const s of D.entityManager.getTargets()){const o=s.getWorldPosition(this.tempVector3);if(!s.isExploded&&Ml(o,e,t)){const a=o.distanceTo(this.scratchCameraPos);a<r&&a<this.config.maxRange&&(r=a,n=s)}}n&&(n.explode(),Ns(n.getScore()),Sm())}updateSpecial(e,t,n){}updateLasers(e){if(!D.entityManager)return;const t=D.entityManager.getLasers(),n=D.entityManager.getFireballs(),r=this.config.fireballCollisionRadiusNDC*this.config.fireballCollisionRadiusNDC;t.forEach(s=>{this.laserPos2D.set(s.mesh.position.x,s.mesh.position.y);for(let o=n.length-1;o>=0;o--){const a=n[o];if(a.isExploded)continue;a.projectToNDC(e,this.tempVector3),this.fbPos2D.set(this.tempVector3.x,this.tempVector3.y),this.laserPos2D.distanceToSquared(this.fbPos2D)<r&&(Ns(this.config.fireballPoints),a.explode())}})}}class Rm extends Ks{constructor(e){super(e)}checkHits(e,t){this.checkTargets(e,t)}}class Cm extends Ks{constructor(e){super(e)}checkHits(e,t){this.checkTargets(e,t)}}class Pm extends Ks{constructor(t){super(t);U(this,"wasFiring",!1)}checkHits(t,n){this.checkTargets(t,n)}updateSpecial(t,n,r){D.stage==="TRENCH"&&D.stageManager&&(D.canFireTorpedo=D.stageManager.checkExhaustPortHit(n,r),n.isFiring&&!this.wasFiring&&D.canFireTorpedo&&!D.hasFiredTorpedo&&(this.launchTorpedo(n,r),D.hasFiredTorpedo=!0),this.wasFiring=n.isFiring)}launchTorpedo(t,n){var c,h;if(!D.player)return;const r=D.player.position.clone(),s=new R(t.x,t.y,.5);s.unproject(n),n.getWorldPosition(this.tempVector3);const o=new R().subVectors(s,this.tempVector3).normalize(),a=((h=(c=D.stageManager)==null?void 0:c.getStage())==null?void 0:h.speed)??this.config.baseForwardSpeed,l=o.multiplyScalar(a*this.config.torpedoSpeedMultiplier);xm(r,l)}}class Lm{constructor(e){U(this,"camera");U(this,"currentStrategy",null);U(this,"currentStage",null);this.camera=e,this.updateStrategy()}update(e,t){this.updateStrategy(),this.camera.updateMatrixWorld(),this.currentStrategy&&this.currentStrategy.update(e,t,this.camera)}updateStrategy(){if(this.currentStage===D.stage&&this.currentStrategy)return;this.currentStage=D.stage;const e={maxRange:I.laser.maxRange,fireCooldown:I.laser.cooldown,fireballCollisionRadiusNDC:I.fireball.collisionRadiusNDC,fireballPoints:I.fireball.points,baseForwardSpeed:I.player.baseForwardSpeed,torpedoSpeedMultiplier:I.torpedo.speedMultiplier};switch(this.currentStage){case"DOGFIGHT":this.currentStrategy=new Rm(e);break;case"SURFACE":this.currentStrategy=new Cm(e);break;case"TRENCH":this.currentStrategy=new Pm(e);break;default:this.currentStrategy=null}}}class Dm{constructor(e){U(this,"combatSystem");U(this,"camera");this.camera=e,this.combatSystem=new Lm(e)}update(e,t){_m(e,this.camera,t),this.combatSystem.update(e,t)}}console.log("Vibe Wars starting...");const{scene:Or,camera:js,hudScene:yl,hudCamera:Um,renderer:Im}=ym();gm(Or,yl);const Fm=new Os,Bs=new bm;Bs.setup();const Nm=new Am,Om=new Dm(js),yr=new wm;Or.add(yr.points);D.player&&(Or.add(D.player.mesh),Em(js,D.player));let zs=0;function Tl(i){var n,r;const e=Math.min((i-zs)/1e3,I.core.deltaTimeCap);zs=i,Bs.update(e);const t=Bs.getInput();Om.update(e,t),Nm.update(t),Fm.update(D),D.player&&(yr.points.visible=((r=(n=D.stageManager)==null?void 0:n.getStage())==null?void 0:r.showStarField)??!1,yr.points.visible&&yr.update(D.player.position),Tm(Im,Or,js,yl,Um)),requestAnimationFrame(Tl)}requestAnimationFrame(i=>{zs=i,requestAnimationFrame(Tl)});
