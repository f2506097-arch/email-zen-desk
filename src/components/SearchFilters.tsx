import { Search, Filter, Calendar, User, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export function SearchFilters({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
}: SearchFiltersProps) {
  const activeFilters = [
    { id: 'unread', label: 'Unread', count: 3 },
    { id: 'important', label: 'Important', count: 2 },
    { id: 'starred', label: 'Starred', count: 1 }
  ];

  return (
    <div className="bg-gradient-card rounded-xl p-6 shadow-card border border-border/50">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search emails, senders, or keywords..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-background/50 border-border/50 focus:border-primary transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={selectedFilter} onValueChange={onFilterChange}>
            <SelectTrigger className="w-40 bg-background/50">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All emails</SelectItem>
              <SelectItem value="unread">Unread only</SelectItem>
              <SelectItem value="important">Important</SelectItem>
              <SelectItem value="starred">Starred</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This week</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" className="bg-background/50">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <span className="text-sm text-muted-foreground">Quick filters:</span>
        {activeFilters.map((filter) => (
          <Badge
            key={filter.id}
            variant={selectedFilter === filter.id ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/10 transition-colors"
            onClick={() => onFilterChange(filter.id)}
          >
            {filter.label}
            <span className="ml-1 text-xs">({filter.count})</span>
          </Badge>
        ))}
      </div>
    </div>
  );
}