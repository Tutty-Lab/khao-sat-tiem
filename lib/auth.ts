import {createHmac,timingSafeEqual} from 'node:crypto';
import {cookies} from 'next/headers';
export function equal(a:string,b:string){const x=Buffer.from(a),y=Buffer.from(b);return x.length===y.length&&timingSafeEqual(x,y)}
function sign(value:string){return createHmac('sha256',process.env.ADMIN_PASSWORD||'').update(value).digest('hex')}
export function session(){const expires=String(Date.now()+8*3600000);return `${expires}.${sign(expires)}`}
export async function authorized(){if(!process.env.ADMIN_PASSWORD)return false;const token=(await cookies()).get('survey_admin')?.value||'';const [expires,signature]=token.split('.');return Number(expires)>Date.now()&&!!signature&&equal(signature,sign(expires))}
