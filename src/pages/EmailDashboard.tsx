import { useState } from "react";
import { EmailThread } from "@/components/EmailThread";
import { SearchFilters } from "@/components/SearchFilters";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Inbox, RefreshCw, Settings, Mail, TrendingUp } from "lucide-react";

const mockEmailThreads = [
  {
    id: "1",
    sender: {
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      avatar: undefined
    },
    subject: "Q4 Budget Review Meeting - Action Items",
    preview: "Hi team, Following up on yesterday's budget meeting. We need to review the proposed allocations for Q4 and finalize the department budgets by Friday...",
    summary: "Budget meeting follow-up with Q4 allocation review deadline Friday. Action items include finalizing department budgets and reviewing proposed spending.",
    messageCount: 5,
    lastActivity: "2 hours ago",
    isUnread: true,
    isImportant: true,
    isStarred: false
  },
  {
    id: "2",
    sender: {
      name: "Marcus Chen",
      email: "marcus.chen@techcorp.com",
      avatar: undefined
    },
    subject: "Project Alpha - Technical Requirements Update",
    preview: "Hey there! I've updated the technical requirements document for Project Alpha. Could you review the new API specifications and database schema changes?",
    summary: "Technical requirements updated for Project Alpha. Review needed for new API specs and database schema modifications.",
    messageCount: 3,
    lastActivity: "4 hours ago",
    isUnread: true,
    isImportant: false,
    isStarred: true
  },
  {
    id: "3",
    sender: {
      name: "Emily Rodriguez",
      email: "emily.r@marketing.co",
      avatar: undefined
    },
    subject: "Campaign Performance Report - September",
    preview: "Good morning! Here's the detailed performance report for our September marketing campaigns. Overall, we saw a 15% increase in engagement rates...",
    summary: "September marketing campaign results showing 15% engagement increase. Detailed performance metrics and recommendations for October campaigns included.",
    messageCount: 2,
    lastActivity: "6 hours ago",
    isUnread: false,
    isImportant: false,
    isStarred: false
  },
  {
    id: "4",
    sender: {
      name: "David Park",
      email: "d.park@hr.company.com",
      avatar: undefined
    },
    subject: "Annual Performance Review Schedule",
    preview: "Hi everyone, We're starting to schedule annual performance reviews for Q4. Please check your calendar availability and let me know your preferred time slots...",
    summary: "Q4 performance review scheduling. Need to confirm calendar availability and preferred time slots for annual reviews.",
    messageCount: 1,
    lastActivity: "1 day ago",
    isUnread: false,
    isImportant: true,
    isStarred: false
  },
  {
    id: "5",
    sender: {
      name: "Lisa Thompson",
      email: "lisa.thompson@vendor.com",
      avatar: undefined
    },
    subject: "Invoice #INV-2024-0892 - Payment Due",
    preview: "Dear valued customer, This is a friendly reminder that Invoice #INV-2024-0892 for $2,450.00 is due on October 15th. Please process payment at your earliest convenience...",
    summary: "Payment reminder for invoice INV-2024-0892 ($2,450) due October 15th. Includes payment instructions and contact info for questions.",
    messageCount: 1,
    lastActivity: "2 days ago",
    isUnread: false,
    isImportant: false,
    isStarred: false
  }
];

export default function EmailDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredThreads = mockEmailThreads.filter(thread => {
    const matchesSearch = 
      thread.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.preview.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      selectedFilter === "all" ||
      (selectedFilter === "unread" && thread.isUnread) ||
      (selectedFilter === "important" && thread.isImportant) ||
      (selectedFilter === "starred" && thread.isStarred);
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: mockEmailThreads.length,
    unread: mockEmailThreads.filter(t => t.isUnread).length,
    important: mockEmailThreads.filter(t => t.isImportant).length,
    starred: mockEmailThreads.filter(t => t.isStarred).length
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Email Dashboard</h1>
                <p className="text-primary-foreground/80">Smart email thread management for busy professionals</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Button variant="secondary" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-gradient-card shadow-card">
            <div className="flex items-center gap-3">
              <Inbox className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Threads</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-card shadow-card">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-status-unread/20 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-status-unread"></div>
              </div>
              <div>
                <p className="text-2xl font-bold text-status-unread">{stats.unread}</p>
                <p className="text-sm text-muted-foreground">Unread</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-card shadow-card">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-status-important/20 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-status-important"></div>
              </div>
              <div>
                <p className="text-2xl font-bold text-status-important">{stats.important}</p>
                <p className="text-sm text-muted-foreground">Important</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-card shadow-card">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-status-success" />
              <div>
                <p className="text-2xl font-bold text-status-success">85%</p>
                <p className="text-sm text-muted-foreground">Processed</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <SearchFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        </div>

        {/* Email Threads */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Email Threads
              <span className="ml-2 text-muted-foreground text-base font-normal">
                ({filteredThreads.length} {selectedFilter !== 'all' ? `${selectedFilter} ` : ''}threads)
              </span>
            </h2>
          </div>
          
          {filteredThreads.length > 0 ? (
            filteredThreads.map((thread) => (
              <EmailThread key={thread.id} {...thread} />
            ))
          ) : (
            <Card className="p-12 text-center bg-gradient-card shadow-card">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No email threads found</h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? "Try adjusting your search terms or filters" 
                  : "Your email threads will appear here once connected"}
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}