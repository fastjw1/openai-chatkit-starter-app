import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SettingsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (apiKey: string, workflowId: string) => void;
}

export function SettingsDialog({ open, onOpenChange, onSave }: SettingsDialogProps) {
    const [apiKey, setApiKey] = useState("");
    const [workflowId, setWorkflowId] = useState("");

    useEffect(() => {
        const storedApiKey = localStorage.getItem("openai_api_key");
        const storedWorkflowId = localStorage.getItem("chatkit_workflow_id");
        if (storedApiKey) setApiKey(storedApiKey);
        if (storedWorkflowId) setWorkflowId(storedWorkflowId);
    }, [open]);

    const handleSave = () => {
        localStorage.setItem("openai_api_key", apiKey);
        localStorage.setItem("chatkit_workflow_id", workflowId);
        onSave(apiKey, workflowId);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="apiKey" className="text-right">
                            API Key
                        </Label>
                        <Input
                            id="apiKey"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="col-span-3"
                            type="password"
                            placeholder="sk-..."
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="workflowId" className="text-right">
                            Workflow ID
                        </Label>
                        <Input
                            id="workflowId"
                            value={workflowId}
                            onChange={(e) => setWorkflowId(e.target.value)}
                            className="col-span-3"
                            placeholder="wf_..."
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSave}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
