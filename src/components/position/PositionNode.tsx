'use client';

import { useState } from 'react';
import { Card, Group, Text, ActionIcon, Collapse, Badge, Box, Tooltip } from '@mantine/core';
import { IconChevronDown, IconChevronRight, IconPlus, IconEdit, IconTrash, IconBriefcase } from '@tabler/icons-react';
import { Position } from '@/types/position';

interface PositionNodeProps {
  position: Position;
  level?: number;
  onAddChild: (parentId: string) => void;
  onEdit: (position: Position) => void;
  onDelete: (position: Position) => void;
}

export function PositionNode({ 
  position, 
  level = 0, 
  onAddChild, 
  onEdit, 
  onDelete 
}: PositionNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = position.children && position.children.length > 0;

  const indentStyle = {
    marginLeft: level > 0 ? `${level * 32}px` : '0',
  };

  return (
    <Box className="relative">
      <Card
        shadow="sm"
        padding="md"
        radius="md"
        withBorder
        className="mb-3 card-hover bg-white border-gray-200 hover:border-teal-300"
        style={indentStyle}
      >
        <Group justify="space-between" wrap="nowrap">
          <Group gap="sm" className="flex-1">
            {hasChildren && (
              <ActionIcon
                variant="subtle"
                color="teal"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <IconChevronDown size={18} /> : <IconChevronRight size={18} />}
              </ActionIcon>
            )}
            
            {!hasChildren && <Box style={{ width: 28 }} />}

            <Box className="flex items-center gap-2 flex-1">
              <IconBriefcase size={20} className="text-teal-600" />
              <div className="flex-1">
                <Group gap="xs" align="center">
                  <Text fw={600} size="sm" className="text-gray-800">
                    {position.name}
                  </Text>
                  {level === 0 && (
                    <Badge size="xs" color="teal" variant="light">
                      Root
                    </Badge>
                  )}
                  {hasChildren && (
                    <Badge size="xs" color="gray" variant="light">
                      {position.children.length} {position.children.length === 1 ? 'child' : 'children'}
                    </Badge>
                  )}
                </Group>
                {position.description && (
                  <Text size="xs" c="dimmed" lineClamp={1} className="mt-1">
                    {position.description}
                  </Text>
                )}
              </div>
            </Box>
          </Group>

          <Group gap="xs" wrap="nowrap">
            <Tooltip label="Add Child Position">
              <ActionIcon
                variant="light"
                color="teal"
                size="md"
                onClick={() => onAddChild(position.id)}
              >
                <IconPlus size={16} />
              </ActionIcon>
            </Tooltip>

            <Tooltip label="Edit Position">
              <ActionIcon
                variant="light"
                color="blue"
                size="md"
                onClick={() => onEdit(position)}
              >
                <IconEdit size={16} />
              </ActionIcon>
            </Tooltip>

            <Tooltip label="Delete Position">
              <ActionIcon
                variant="light"
                color="red"
                size="md"
                onClick={() => onDelete(position)}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      </Card>

      {hasChildren && (
        <Collapse in={isExpanded}>
          <Box className="relative">
            {position.children.map((child, index) => (
              <Box key={child.id} className={level > 0 ? 'tree-line' : ''}>
                <PositionNode
                  position={child}
                  level={level + 1}
                  onAddChild={onAddChild}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </Box>
            ))}
          </Box>
        </Collapse>
      )}
    </Box>
  );
}
