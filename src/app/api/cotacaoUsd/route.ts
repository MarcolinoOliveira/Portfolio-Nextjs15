import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.frankfurter.app/latest?amount=1&from=BRL&to=USD");

    if (!res.ok) {
      return NextResponse.json({ error: "Erro ao buscar cotação externa" }, { status: 500 });
    }

    const data = await res.json();

    const rate = data?.rates?.USD;

    if (!rate) {
      return NextResponse.json({ error: "Cotação não encontrada" }, { status: 500 });
    }

    return NextResponse.json({ rate });
  } catch (error) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}