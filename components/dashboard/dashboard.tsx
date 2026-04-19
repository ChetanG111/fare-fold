'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Dashboard() {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [departureDate, setDepartureDate] = useState<Date>()
  const [trackedFlights, setTrackedFlights] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [totalSavings, setTotalSavings] = useState(0)

  const fetchTrackedFlights = async () => {
    try {
      const response = await fetch('/api/fare-fold')
      const data = await response.json()
      if (data.trackedFlights) {
        setTrackedFlights(data.trackedFlights)
      }
    } catch (error) {
      console.error('Error fetching tracked flights:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTrackedFlights()
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!departureDate || !origin || !destination) {
        return;
    }

    setIsSubmitting(true)
    const formattedDate = format(departureDate, 'yyyy-MM-dd');

    try {
      const response = await fetch('/api/fare-fold', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ origin, destination, departureDate: formattedDate }),
      })

      const data = await response.json()

      if (data.trackedFlightId) {
        await fetchTrackedFlights()
        setOrigin('')
        setDestination('')
        setDepartureDate(undefined)
      }
    } catch (error) {
      console.error('Error tracking flight:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-[#211b17]">Your Dashboard</h1>

      <Card className="mb-6 border-[#ded3c5] bg-[#fffdf8]">
        <CardHeader>
          <CardTitle className="text-[#211b17]">Start tracking a trip</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <Input
              type="text"
              placeholder="Origin (IATA)"
              value={origin}
              onChange={(e) => setOrigin(e.target.value.toUpperCase())}
              className="md:max-w-[150px]"
            />
            <Input
              type="text"
              placeholder="Destination (IATA)"
              value={destination}
              onChange={(e) => setDestination(e.target.value.toUpperCase())}
              className="md:max-w-[150px]"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full md:w-[240px] justify-start text-left font-normal border-[#ded3c5]',
                    !departureDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {departureDate ? format(departureDate, 'PPP') : <span>Pick departure date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-[#ded3c5]">
                <Calendar
                  mode="single"
                  selected={departureDate}
                  onSelect={setDepartureDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-[#8f2f24] hover:bg-[#8f2f24]/90 text-white"
            >
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isSubmitting ? 'Tracking...' : 'Track Trip'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card className="border-[#ded3c5] bg-[#fffdf8]">
          <CardHeader>
            <CardTitle className="text-[#211b17] text-sm uppercase tracking-wider font-extrabold">Active Trackers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-[#211b17]">{trackedFlights.length}</p>
          </CardContent>
        </Card>
        <Card className="border-[#ded3c5] bg-[#fffdf8]">
          <CardHeader>
            <CardTitle className="text-[#211b17] text-sm uppercase tracking-wider font-extrabold">Total Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-[#246b50]">${totalSavings}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-[#ded3c5] bg-[#fffdf8]">
        <CardHeader>
          <CardTitle className="text-[#211b17]">Your Tracked Flights</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[#ded3c5]">
                <TableHead>Route</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-[#8f2f24]" />
                  </TableCell>
                </TableRow>
              ) : trackedFlights.map((flight) => {
                const activeBooking = flight.bookings?.[0];
                return (
                  <TableRow key={flight.id} className="border-[#ded3c5]">
                    <TableCell className="font-bold">
                      {flight.origin} → {flight.destination}
                    </TableCell>
                    <TableCell>{format(new Date(flight.departureDate), 'PPP')}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                        flight.status === 'tracking' ? "bg-blue-100 text-blue-800" : 
                        flight.status === 'rebooked' ? "bg-green-100 text-green-800" : 
                        "bg-gray-100 text-gray-800"
                      )}>
                        {flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {activeBooking ? (
                        <span className="font-bold text-[#8f2f24]">
                          {activeBooking.currency} {activeBooking.price}
                        </span>
                      ) : (
                        <span className="text-muted-foreground italic text-sm">Searching...</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="border-[#ded3c5]">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
              {!isLoading && trackedFlights.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20 text-muted-foreground">
                    <p className="mb-2 font-bold text-[#211b17]">No tracked trips yet</p>
                    <p>Enter your flight details above to start saving.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
