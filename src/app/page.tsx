import Link from "next/link";

export default function Home() {
  return (
    <div>
      <button>
        <Link href="/users/list">Usuários</Link>
      </button>
    </div>
  );
}
