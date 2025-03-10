import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { CalendarDays, Users } from "lucide-react";

interface AccountMetadataProps {
  profilePicture?: string;
  username?: string;
  accountAge?: string;
  followerCount?: number;
}

const AccountMetadataPanel: React.FC<AccountMetadataProps> = ({
  profilePicture = "https://api.dicebear.com/7.x/avataaars/svg?seed=twitter",
  username = "@twitteruser",
  accountAge = "2 years",
  followerCount = 1234,
}) => {
  return (
    <Card className="w-full bg-white border-gray-200">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={profilePicture} alt={username} />
          <AvatarFallback>
            {username.substring(1, 3).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="font-bold text-lg">{username}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <span>Joined {accountAge}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{followerCount.toLocaleString()} followers</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Badge variant="secondary" className="text-blue-600 bg-blue-100">
            Verified Account
          </Badge>
          <Badge variant="outline" className="text-gray-600 border-gray-300">
            {Math.floor(Math.random() * 100) + 1} lists
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountMetadataPanel;
