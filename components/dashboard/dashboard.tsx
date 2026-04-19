'use client'

import { useEffect, useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { 
  Autocomplete, 
  AutocompleteInput, 
  AutocompletePopup, 
  AutocompleteList, 
  AutocompleteItem, 
  AutocompleteEmpty 
} from '@/components/ui/autocomplete'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, Loader2, PlaneTakeoff, PlaneLanding } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Dashboard() {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [departureDate, setDepartureDate] = useState<Date>()
  const [trackedFlights, setTrackedFlights] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [totalSavings, setTotalSavings] = useState(0)

  // Airport suggestions state
  const [originQuery, setOriginQuery] = useState('')
  const [destQuery, setDestQuery] = useState('')
  const [originOptions, setOriginOptions] = useState<any[]>([])
  const [destOptions, setDestOptions] = useState<any[]>([])
  const [isSearchingOrigins, setIsSearchingOrigins] = useState(false)
  const [isSearchingDestinations, setIsSearchingDestinations] = useState(false)

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

  useEffect(() => {
    // Basic savings calculation: (original price - current price)
    // For now, since we only show the 'active' booking price, 
    // we'll just mock a logic or sum up specific values if available.
    // Assuming trackedFlights[i].bookings[0].price exists.
    const savings = trackedFlights.reduce((acc, flight) => {
      // In a real app, you'd compare original price to current price
      // For this demo, let's just show a positive number if we have bookings
      if (flight.bookings && flight.bookings.length > 0) {
        return acc + Math.floor(Math.random() * 50) // Mock savings for demo
      }
      return acc
    }, 0)
    setTotalSavings(savings)
  }, [trackedFlights])

  const searchAirports = async (query: string, setOptions: (opts: any[]) => void, setLoading: (l: boolean) => void) => {
    if (!query || query.length < 2) {
      setOptions([])
      return
    }
    
    console.log(`[Dashboard] Searching for airports: "${query}"`)
    setLoading(true)
    try {
      const response = await fetch(`/api/airports?q=${encodeURIComponent(query)}`)
      const data = await response.json()
      console.log(`[Dashboard] Found ${Array.isArray(data) ? data.length : 0} airports`)
      setOptions(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('[Dashboard] Airport search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  // Debounced search for origin
  useEffect(() => {
    const timer = setTimeout(() => {
      if (originQuery && originQuery.length >= 2) {
        searchAirports(originQuery, setOriginOptions, setIsSearchingOrigins)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [originQuery])

  // Debounced search for destination
  useEffect(() => {
    const timer = setTimeout(() => {
      if (destQuery && destQuery.length >= 2) {
        searchAirports(destQuery, setDestOptions, setIsSearchingDestinations)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [destQuery])

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
        setOriginQuery('')
        setDestQuery('')
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
          <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="grid gap-2 w-full lg:w-auto flex-1">
              <label className="text-xs font-bold uppercase text-[#8f2f24]/80">Origin</label>
              <Autocomplete value={origin} onValueChange={setOrigin}>
                <AutocompleteInput 
                  placeholder="City or Airport" 
                  className="w-full border-[#ded3c5] focus-visible:ring-[#8f2f24]"
                  value={originQuery}
                  onInput={(e: any) => setOriginQuery(e.target.value)}
                  startAddon={<PlaneTakeoff className="size-4" />}
                />
                <AutocompletePopup className="border-[#ded3c5] shadow-xl overflow-hidden rounded-lg">
                  <AutocompleteList className="bg-[#fffdf8] p-1">
                    {isSearchingOrigins && (
                      <div className="p-4 text-center">
                        <Loader2 className="size-4 animate-spin mx-auto text-[#8f2f24]" />
                      </div>
                    )}
                    {originOptions.map((opt) => (
                      <AutocompleteItem 
                        key={opt.iataCode} 
                        value={opt.iataCode}
                        className="data-[highlighted]:bg-[#8f2f24] data-[highlighted]:text-[#fff8ee] transition-colors"
                      >
                        <div className="flex flex-col py-1">
                          <span className="font-bold">{opt.iataCode}</span>
                          <span className="text-xs opacity-80">{opt.name} ({opt.address.cityName})</span>
                        </div>
                      </AutocompleteItem>
                    ))}
                    {!isSearchingOrigins && originQuery.length >= 2 && originOptions.length === 0 && (
                      <AutocompleteEmpty className="p-4 text-sm text-muted-foreground italic text-center">No airports found</AutocompleteEmpty>
                    )}
                  </AutocompleteList>
                </AutocompletePopup>
              </Autocomplete>
            </div>

            <div className="grid gap-2 w-full lg:w-auto flex-1">
              <label className="text-xs font-bold uppercase text-[#8f2f24]/80">Destination</label>
              <Autocomplete value={destination} onValueChange={setDestination}>
                <AutocompleteInput 
                  placeholder="City or Airport" 
                  className="w-full border-[#ded3c5] focus-visible:ring-[#8f2f24]"
                  value={destQuery}
                  onInput={(e: any) => setDestQuery(e.target.value)}
                  startAddon={<PlaneLanding className="size-4" />}
                />
                <AutocompletePopup className="border-[#ded3c5] shadow-xl overflow-hidden rounded-lg">
                  <AutocompleteList className="bg-[#fffdf8] p-1">
                    {isSearchingDestinations && (
                      <div className="p-4 text-center">
                        <Loader2 className="size-4 animate-spin mx-auto text-[#8f2f24]" />
                      </div>
                    )}
                    {destOptions.map((opt) => (
                      <AutocompleteItem 
                        key={opt.iataCode} 
                        value={opt.iataCode}
                        className="data-[highlighted]:bg-[#8f2f24] data-[highlighted]:text-[#fff8ee] transition-colors"
                      >
                        <div className="flex flex-col py-1">
                          <span className="font-bold">{opt.iataCode}</span>
                          <span className="text-xs opacity-80">{opt.name} ({opt.address.cityName})</span>
                        </div>
                      </AutocompleteItem>
                    ))}
                    {!isSearchingDestinations && destQuery.length >= 2 && destOptions.length === 0 && (
                      <AutocompleteEmpty className="p-4 text-sm text-muted-foreground italic text-center">No airports found</AutocompleteEmpty>
                    )}
                  </AutocompleteList>
                </AutocompletePopup>
              </Autocomplete>
            </div>

            <div className="grid gap-2 w-full lg:w-auto">
              <label className="text-xs font-bold uppercase text-[#8f2f24]">Departure Date</label>
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full lg:w-[200px] justify-start text-left font-normal border-[#ded3c5]',
                        !departureDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {departureDate ? format(departureDate, 'PPP') : <span>Pick date</span>}
                    </Button>
                  }
                />
                <PopoverContent className="w-auto p-0 border-[#ded3c5]">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={setDepartureDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting || !origin || !destination || !departureDate}
              className="w-full lg:w-auto bg-[#8f2f24] hover:bg-[#8f2f24]/90 text-white font-bold h-10 px-8"
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
