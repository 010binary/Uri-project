import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type DateRangeFilterProps = {
  onDateRangeChange: (dateRange: { start: string; end: string }) => void
}

export default function DateRangeFilter({ onDateRangeChange }: DateRangeFilterProps) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleDateChange = () => {
    onDateRangeChange({ start: startDate, end: endDate })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full sm:w-auto"
        />
        <span className="hidden sm:inline">to</span>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full sm:w-auto"
        />
      </div>
      <Button
        onClick={handleDateChange}
        className="w-full sm:w-auto bg-blue-400"
      >
        Apply Filter
      </Button>
    </div>
  )
}

