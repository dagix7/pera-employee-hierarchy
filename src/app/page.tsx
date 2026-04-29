'use client';

import { useEffect, useState } from 'react';
import { Container, Title, Button, Group, Box, Text, Alert, Paper } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconAlertCircle, IconCheck, IconTrash } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  fetchPositionsTree,
  createPosition,
  updatePosition,
  deletePosition,
} from '@/features/positions/positionsSlice';
import { PositionNode } from '@/components/position/PositionNode';
import { PositionForm } from '@/components/position/PositionForm';
import { PositionSkeleton } from '@/components/common/PositionSkeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { Position } from '@/types/position';
import { PositionFormData } from '@/schemas/positionSchema';

export default function Home() {
  const dispatch = useAppDispatch();
  const { tree, loading, error } = useAppSelector((state) => state.positions);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchPositionsTree());
  }, [dispatch]);

  const handleCreatePosition = (parentId?: string) => {
    modals.open({
      title: parentId ? 'Create Child Position' : 'Create Root Position',
      size: 'lg',
      children: (
        <PositionForm
          parentId={parentId}
          loading={actionLoading}
          onSubmit={async (data: PositionFormData) => {
            setActionLoading(true);
            try {
              await dispatch(createPosition(data)).unwrap();
              notifications.show({
                title: 'Success',
                message: 'Position created successfully',
                color: 'teal',
                icon: <IconCheck size={18} />,
              });
              modals.closeAll();
              dispatch(fetchPositionsTree());
            } catch (err: any) {
              notifications.show({
                title: 'Error',
                message: err || 'Failed to create position',
                color: 'red',
                icon: <IconAlertCircle size={18} />,
              });
            } finally {
              setActionLoading(false);
            }
          }}
          onCancel={() => modals.closeAll()}
        />
      ),
    });
  };

  const handleEditPosition = (position: Position) => {
    modals.open({
      title: 'Edit Position',
      size: 'lg',
      children: (
        <PositionForm
          position={position}
          loading={actionLoading}
          onSubmit={async (data: PositionFormData) => {
            setActionLoading(true);
            try {
              await dispatch(updatePosition({ id: position.id, data })).unwrap();
              notifications.show({
                title: 'Success',
                message: 'Position updated successfully',
                color: 'teal',
                icon: <IconCheck size={18} />,
              });
              modals.closeAll();
              dispatch(fetchPositionsTree());
            } catch (err: any) {
              notifications.show({
                title: 'Error',
                message: err || 'Failed to update position',
                color: 'red',
                icon: <IconAlertCircle size={18} />,
              });
            } finally {
              setActionLoading(false);
            }
          }}
          onCancel={() => modals.closeAll()}
        />
      ),
    });
  };

  const handleDeletePosition = (position: Position) => {
    modals.openConfirmModal({
      title: 'Delete Position',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete <strong>{position.name}</strong>? 
          This action cannot be undone. Note: Positions with children cannot be deleted.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red', leftSection: <IconTrash size={16} /> },
      onConfirm: async () => {
        try {
          await dispatch(deletePosition(position.id)).unwrap();
          notifications.show({
            title: 'Success',
            message: 'Position deleted successfully',
            color: 'teal',
            icon: <IconCheck size={18} />,
          });
          dispatch(fetchPositionsTree());
        } catch (err: any) {
          notifications.show({
            title: 'Error',
            message: err || 'Failed to delete position',
            color: 'red',
            icon: <IconAlertCircle size={18} />,
          });
        }
      },
    });
  };

  const hasRootPosition = tree.length > 0;

  return (
    <Box className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
      <Container size="xl" py="xl">
        {/* Header */}
        <Paper shadow="sm" p="xl" radius="md" className="mb-8 bg-white border border-gray-100">
          <Group justify="space-between" align="center">
            <Box>
              <Title order={1} className="text-gray-800 mb-2">
                Organizational Hierarchy
              </Title>
              <Text size="sm" c="dimmed">
                Manage your company's position structure
              </Text>
            </Box>
            {hasRootPosition && (
              <Button
                leftSection={<IconPlus size={18} />}
                color="teal"
                size="md"
                onClick={() => handleCreatePosition()}
              >
                Add Root Position
              </Button>
            )}
          </Group>
        </Paper>

        {/* Error Alert */}
        {error && (
          <Alert
            icon={<IconAlertCircle size={18} />}
            title="Error"
            color="red"
            mb="md"
            withCloseButton
            onClose={() => {}}
          >
            {error}
          </Alert>
        )}

        {/* Content */}
        <Paper shadow="sm" p="xl" radius="md" className="bg-white border border-gray-100">
          {loading && !hasRootPosition ? (
            <PositionSkeleton count={5} />
          ) : !hasRootPosition ? (
            <EmptyState onCreateRoot={() => handleCreatePosition()} />
          ) : (
            <Box>
              {(tree || []).map((position) => (
                <PositionNode
                  key={position.id}
                  position={position}
                  onAddChild={handleCreatePosition}
                  onEdit={handleEditPosition}
                  onDelete={handleDeletePosition}
                />
              ))}
            </Box>
          )}
        </Paper>

        {/* Footer */}
        <Box mt="xl" className="text-center">
          <Text size="xs" c="dimmed">
            Perago Information System © 2026
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
