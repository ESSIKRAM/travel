import React from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

interface TestModeToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const TestModeToggle: React.FC<TestModeToggleProps> = ({
  enabled,
  onToggle,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="test-mode" checked={enabled} onCheckedChange={onToggle} />
      <Label htmlFor="test-mode" className="text-sm font-medium">
        Test Mode {enabled && "(Using Mock Data)"}
      </Label>
    </div>
  );
};

export default TestModeToggle;
