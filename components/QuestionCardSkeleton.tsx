// components/QuestionCardSkeleton.tsx
import {Card, CardHeader, CardContent, CardFooter} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';

export default function QuestionCardSkeleton() {
  return (
    <Card className="question-card max-w-2xl mx-auto overflow-hidden">
      <div className="absolute inset-0 peak-puzzler-gradient opacity-10 pointer-events-none"/>

      <CardHeader className="bg-card/30 backdrop-blur-sm border-b border-border/30">
        <div className="flex justify-between items-center mb-2">
          <Skeleton className="h-8 w-36"/>
          <div className="text-right">
            <Skeleton className="h-8 w-24 mb-1"/>
            <Skeleton className="h-5 w-32"/>
          </div>
        </div>

        <Skeleton className="h-2 w-full mt-3 rounded-full"/>

        <Skeleton className="h-7 w-full mt-6"/>
        <Skeleton className="h-7 w-3/4 mt-2"/>
      </CardHeader>

      <CardContent className="space-y-5 p-6">
        <div className="grid grid-cols-1 gap-3">
          {Array(4).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-md"/>
          ))}
        </div>
      </CardContent>

      <CardFooter className="bg-card/30 backdrop-blur-sm border-t border-border/30 flex justify-between">
        <div className="flex space-x-2">
          {Array(3).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-9 w-20 rounded-md"/>
          ))}
        </div>
        <Skeleton className="h-5 w-36 rounded-md"/>
      </CardFooter>
    </Card>
  );
}
