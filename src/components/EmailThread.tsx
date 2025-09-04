import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Mail, AlertCircle, Star } from "lucide-react";

interface EmailThreadProps {
  id: string;
  sender: {
    name: string;
    email: string;
    avatar?: string;
  };
  subject: string;
  preview: string;
  summary: string;
  messageCount: number;
  lastActivity: string;
  isUnread: boolean;
  isImportant: boolean;
  isStarred: boolean;
}

export function EmailThread({
  sender,
  subject,
  preview,
  summary,
  messageCount,
  lastActivity,
  isUnread,
  isImportant,
  isStarred,
}: EmailThreadProps) {
  return (
    <Card className={`
      p-6 bg-gradient-card shadow-card hover:shadow-hover 
      transition-all duration-smooth cursor-pointer group
      ${isUnread ? 'border-l-4 border-l-status-unread' : ''}
      ${isImportant ? 'border-l-4 border-l-status-important' : ''}
    `}>
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
          <AvatarImage src={sender.avatar} alt={sender.name} />
          <AvatarFallback className="bg-gradient-accent font-medium">
            {sender.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {sender.name}
              </h3>
              {isUnread && (
                <Badge variant="secondary" className="text-xs bg-status-unread/10 text-status-unread border-status-unread/20">
                  New
                </Badge>
              )}
              {isImportant && (
                <AlertCircle className="h-4 w-4 text-status-important" />
              )}
              {isStarred && (
                <Star className="h-4 w-4 text-amber-500 fill-current" />
              )}
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Clock className="h-4 w-4" />
              <span>{lastActivity}</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-1">{sender.email}</p>
          
          <h4 className={`text-lg mb-2 line-clamp-1 ${isUnread ? 'font-semibold' : 'font-medium'}`}>
            {subject}
          </h4>
          
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {preview}
          </p>
          
          <div className="bg-gradient-accent p-3 rounded-lg mb-3">
            <p className="text-sm font-medium text-accent-foreground mb-1">AI Summary:</p>
            <p className="text-sm text-accent-foreground/80">{summary}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {messageCount} message{messageCount !== 1 ? 's' : ''}
              </span>
            </div>
            
            <Badge variant="outline" className="text-xs">
              Email Thread
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}