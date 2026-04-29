'use client';

import { Card, Skeleton, Stack, Box } from '@mantine/core';

export function PositionSkeleton({ count = 3 }: { count?: number }) {
  return (
    <Stack gap="md">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} shadow="sm" padding="md" radius="md" withBorder>
          <Box className="flex items-center gap-3">
            <Skeleton height={20} width={20} circle />
            <Box className="flex-1">
              <Skeleton height={16} width="40%" mb="xs" />
              <Skeleton height={12} width="70%" />
            </Box>
            <Box className="flex gap-2">
              <Skeleton height={32} width={32} circle />
              <Skeleton height={32} width={32} circle />
              <Skeleton height={32} width={32} circle />
            </Box>
          </Box>
        </Card>
      ))}
    </Stack>
  );
}
