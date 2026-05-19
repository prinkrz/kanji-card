import NextLink from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof NextLink>;

export default function Link({ prefetch = false, ...props }: Props) {
  return <NextLink prefetch={prefetch} {...props} />;
}
