export interface Position {
  id: string;
  name: string;
  description?: string;
  parent?: Position | null;
  children: Position[];
}

export interface CreatePositionDto {
  name: string;
  description?: string;
  parentId?: string;
}

export interface UpdatePositionDto {
  name?: string;
  description?: string;
  parentId?: string;
}
