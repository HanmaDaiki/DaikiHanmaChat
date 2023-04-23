import Ably from 'ably/promises';

export default async function handler(req, res) {
  const client = new Ably.Realtime('gpOi3g.wIdECg:RPbxaOuP-KJRz7wrA3W7o_c3YhjYfYLswsxO6_kLGgo');
  const tokenRequestData = await client.auth.createTokenRequest({ clientId: 'ws-chat' });
  res.status(200).json(tokenRequestData);
}
