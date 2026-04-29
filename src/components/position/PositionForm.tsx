'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, Textarea, Button, Stack, Group } from '@mantine/core';
import { positionSchema, PositionFormData } from '@/schemas/positionSchema';
import { Position } from '@/types/position';

interface PositionFormProps {
  position?: Position | null;
  parentId?: string;
  onSubmit: (data: PositionFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function PositionForm({ 
  position, 
  parentId, 
  onSubmit, 
  onCancel, 
  loading = false 
}: PositionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<PositionFormData>({
    resolver: zodResolver(positionSchema),
    defaultValues: {
      name: position?.name || '',
      description: position?.description || '',
      parentId: parentId || position?.parent?.id || '',
    },
  });

  useEffect(() => {
    if (position) {
      setValue('name', position.name);
      setValue('description', position.description || '');
    }
    if (parentId) {
      setValue('parentId', parentId);
    }
  }, [position, parentId, setValue]);

  const handleFormSubmit = (data: PositionFormData) => {
    // Clean up empty strings
    const cleanData = {
      ...data,
      description: data.description || undefined,
      parentId: data.parentId || undefined,
    };
    onSubmit(cleanData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Position Name"
          placeholder="e.g., Chief Technology Officer"
          required
          {...register('name')}
          error={errors.name?.message}
          disabled={loading}
        />

        <Textarea
          label="Description"
          placeholder="Brief description of the position's responsibilities..."
          minRows={3}
          maxRows={6}
          {...register('description')}
          error={errors.description?.message}
          disabled={loading}
        />

        <input type="hidden" {...register('parentId')} />

        <Group justify="flex-end" mt="md">
          <Button 
            variant="subtle" 
            color="gray" 
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            color="teal"
            loading={loading}
          >
            {position ? 'Update Position' : 'Create Position'}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
