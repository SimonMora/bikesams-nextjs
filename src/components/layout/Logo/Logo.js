import Link from "next/link";
import { Image } from "semantic-ui-react";

export function Logo() {
  return (
    <Link href="/">
        <Image src="/image/logo-texto.png" alt="bikesams" />
    </Link>
  )
}
