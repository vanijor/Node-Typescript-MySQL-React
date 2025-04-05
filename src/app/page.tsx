import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>React</h1>
      <button>
        <Link href="/users/list">Usuários</Link>
      </button>
    </div>
  );
}
