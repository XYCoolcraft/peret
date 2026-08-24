import { NextRequest, NextResponse } from "next/server";
import { rumahotpFetch } from "@/lib/rumahotp";

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get("order_id");
  if (!orderId) {
    return NextResponse.json(
      { success: false, error: { message: "order_id wajib diisi" } },
      { status: 400 }
    );
  }

  try {
    const data = await rumahotpFetch("/v1/orders/get_status", {
      order_id: orderId,
    });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 500 }
    );
  }
}
