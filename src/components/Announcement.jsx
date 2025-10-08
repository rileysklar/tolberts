import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export default function Announcement() {
  return (
    <div className="relative bg-gradient-to-r from-primary to-primary/90 px-4 py-6">
      <div className="relative mx-auto max-w-5xl">
        <Card className="border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
                  🚨 CLOSED TO PUBLIC Tomorrow Night
                </h2>
                <p className="text-lg font-semibold text-red-600">
                  Thursday, October 9th • Closing at 2:30 PM
                </p>
                <p className="max-w-2xl text-muted-foreground">
                  We're closed to the public tomorrow evening for a private
                  sold-out event (Gary P. Nunn concert). We'll close early at
                  2:30 PM and reopen Friday for regular hours. Thank you for
                  your understanding!
                </p>
              </div>

              <Button
                disabled={true}
                size="lg"
                className="cursor-not-allowed bg-red-500 opacity-75 hover:bg-red-500"
              >
                <span className="inline-flex items-center gap-2">
                  Closed to Public Oct 9th
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
