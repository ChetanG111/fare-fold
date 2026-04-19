'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Dashboard() {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [departureDate, setDepartureDate] = useState<Date>()
  const [flightOffers, setFlightOffers] = useState([])
  const [totalSavings, setTotalSavings] = useState(0)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!departureDate) {
        // Handle error: no date selected
        return;
    }

    const formattedDate = format(departureDate, 'yyyy-MM-dd');

    const response = await fetch('/api/fare-fold', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ origin, destination, departureDate: formattedDate }),
    })

    const data = await response.json()

    if (data.flightOffer) {
      setFlightOffers([data.flightOffer])
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search for a flight</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-4">
            <Input
              type="text"
              placeholder="Origin (IATA)"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Destination (IATA)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[240px] justify-start text-left font-normal',
                    !departureDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {departureDate ? format(departureDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={departureDate}
                  onSelect={setDepartureDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Total Savings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-green-500">${totalSavings}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tracked Flights</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Origin</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Book</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flightOffers.map((offer: any) => (
                <TableRow key={offer.id}>
                  <TableCell>{offer.itineraries[0].segments[0].departure.iataCode}</TableCell>
                  <TableCell>{offer.itineraries[0].segments[0].arrival.iataCode}</TableCell>
                  <TableCell>{format(new Date(offer.itineraries[0].segments[0].departure.at), 'PPP')}</TableCell>
                  <TableCell>${offer.price.total}</TableCell>
                  <TableCell>
                    <Button>Book</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
