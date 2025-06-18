"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2 } from "lucide-react"

interface Payment {
  id: string
  amount: number
  date: string
  status: "paid" | "pending" | "failed"
  lessons: number
}

interface PaymentResponseItem {
  id: string
  amount_total?: number
  createdAt?: string
  payment_status?: "paid" | "pending" | "failed"
  product?: string
}

export default function PaymentsPage() {
  const { user } = useUser()
  const [payments, setPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchPayments = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/payments?filters[userId][$eq]=${user.id}&sort=createdAt:desc`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
            },
          }
        )

        const data = await res.json()
        console.log("Strapi response:", data)

        const formatted = Array.isArray(data.data)
        ? data.data.map((item: PaymentResponseItem) => ({
            id: item.id,
            amount: item.amount_total ? item.amount_total  : 0,
            date: item.createdAt
              ? new Date(item.createdAt).toLocaleDateString("pl-PL")
              : "-",
            status: item.payment_status ?? "pending",
            lessons: item.product?.includes("pakiet") ? 4 : 1,
          }))
        : []
      

        setPayments(formatted)
      } catch (err) {
        console.error("Błąd pobierania płatności:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPayments()
  }, [user])

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Płatności i pakiety</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            </div>
          ) : payments.length === 0 ? (
            <p className="text-sm text-gray-500">Brak historii płatności.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Lekcje</TableHead>
                  <TableHead className="text-right">Kwota</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.id}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>
                      <span
                        className={
                          payment.status === "paid"
                            ? "text-green-600"
                            : payment.status === "pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }
                      >
                        {payment.status}
                      </span>
                    </TableCell>
                    <TableCell>{payment.lessons}</TableCell>
                    <TableCell className="text-right">
                      {payment.amount.toFixed(2)} zł
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
