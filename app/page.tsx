import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/login');  // 最初にアクセスされたらログイン画面へ
}
