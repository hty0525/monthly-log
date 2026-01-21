import { Badge } from '@/shared/components/badge/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/card/card';

import type { FC } from 'react';

type PersonalProgressWidgetProps = {
  postCount: number;
  commentCount: number;
  postGoal?: number;
  commentGoal?: number;
};

export const PersonalProgressWidget: FC<PersonalProgressWidgetProps> = ({
  postCount,
  commentCount,
  postGoal = 2,
  commentGoal = 10,
}) => {
  const isPostGoalAchieved = postCount >= postGoal;
  const isCommentGoalAchieved = commentCount >= commentGoal;
  const isAllGoalsAchieved = isPostGoalAchieved && isCommentGoalAchieved;

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">이번 달 목표</CardTitle>
          {isAllGoalsAchieved && (
            <Badge variant="success">🎉 달성!</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 글 작성 진행률 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">글 작성</span>
            <span className={isPostGoalAchieved ? 'text-green-600 font-semibold' : ''}>
              {postCount}/{postGoal}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className={`h-full transition-all ${
                isPostGoalAchieved ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${getProgressPercentage(postCount, postGoal)}%` }}
            />
          </div>
          {!isPostGoalAchieved && (
            <p className="text-xs text-muted-foreground">
              {postGoal - postCount}개 더 작성하세요
            </p>
          )}
        </div>

        {/* 댓글 작성 진행률 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">댓글 작성</span>
            <span className={isCommentGoalAchieved ? 'text-green-600 font-semibold' : ''}>
              {commentCount}/{commentGoal}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className={`h-full transition-all ${
                isCommentGoalAchieved ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${getProgressPercentage(commentCount, commentGoal)}%` }}
            />
          </div>
          {!isCommentGoalAchieved && (
            <p className="text-xs text-muted-foreground">
              {commentGoal - commentCount}개 더 작성하세요
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
