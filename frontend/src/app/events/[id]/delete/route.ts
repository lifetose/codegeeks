import { deleteEvent } from "../../../../utils/api";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  await deleteEvent(params.id);
  return NextResponse.redirect(new URL("/", req.url));
}
