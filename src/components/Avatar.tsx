import Image from "next/image";

export default function Avatar({ src }: { src: string }) {
  return <Image src={src} width={400} height={300} alt="…" />;
}
