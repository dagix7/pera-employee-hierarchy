'use client';

import { Box, Text, Button, Stack } from '@mantine/core';
import { IconBriefcaseOff } from '@tabler/icons-react';

interface EmptyStateProps {
  onCreateRoot: () => void;
}

export function EmptyState({ onCreateRoot }: EmptyStateProps) {
  return (
    <Box className="flex items-center justify-center min-h-[400px]">
      <Stack align="center" gap="md">
        <IconBriefcaseOff size={64} className="text-gray-300" />
        <Text size="lg" fw={500} c="dimmed">
          No positions yet
        </Text>
        <Text size="sm" c="dimmed" ta="center" maw={400}>
          Start building your organizational hierarchy by creating the root position (CEO, President, etc.)
        </Text>
        <Button 
          color="teal" 
          size="md" 
          onClick={onCreateRoot}
          mt="md"
        >
          Create Root Position
        </Button>
      </Stack>
    </Box>
  );
}
