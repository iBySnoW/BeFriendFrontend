"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type FilterProps = {
  onFilterChange: (filters: { date?: Date; group?: string }) => void
}

export function EventFilters({ onFilterChange }: FilterProps) {
  const [date, setDate] = useState<Date>()
  const [group, setGroup] = useState<string>()

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate)
    onFilterChange({ date: newDate, group })
  }

  const handleGroupChange = (newGroup: string) => {
    setGroup(newGroup)
    onFilterChange({ date, group: newGroup })
  }

  return (
    <div className="flex space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
            <Calendar className="mr-2 h-4 w-4" />
            {date ? date.toLocaleDateString() : <span>Choisir une date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent mode="single" selected={date} onSelect={handleDateChange} initialFocus />
        </PopoverContent>
      </Popover>

      <Select onValueChange={handleGroupChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Choisir un groupe" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="famille">Famille</SelectItem>
          <SelectItem value="amis">Amis</SelectItem>
          <SelectItem value="travail">Travail</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
