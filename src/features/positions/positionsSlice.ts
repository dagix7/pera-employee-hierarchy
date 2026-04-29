import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';
import { Position, CreatePositionDto, UpdatePositionDto } from '@/types/position';

interface PositionsState {
  tree: Position[];
  loading: boolean;
  error: string | null;
  selectedPosition: Position | null;
}

const initialState: PositionsState = {
  tree: [],
  loading: false,
  error: null,
  selectedPosition: null,
};

// Async Thunks
export const fetchPositionsTree = createAsyncThunk(
  'positions/fetchTree',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Position[]>('/positions');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPosition = createAsyncThunk(
  'positions/create',
  async (data: CreatePositionDto, { rejectWithValue }) => {
    try {
      const response = await api.post<Position>('/positions', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePosition = createAsyncThunk(
  'positions/update',
  async ({ id, data }: { id: string; data: UpdatePositionDto }, { rejectWithValue }) => {
    try {
      const response = await api.patch<Position>(`/positions/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePosition = createAsyncThunk(
  'positions/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/positions/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {
    setSelectedPosition: (state, action: PayloadAction<Position | null>) => {
      state.selectedPosition = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Tree
    builder
      .addCase(fetchPositionsTree.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPositionsTree.fulfilled, (state, action) => {
        state.loading = false;
        state.tree = action.payload;
      })
      .addCase(fetchPositionsTree.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create Position
    builder
      .addCase(createPosition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPosition.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createPosition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Position
    builder
      .addCase(updatePosition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePosition.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePosition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete Position
    builder
      .addCase(deletePosition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePosition.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deletePosition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedPosition, clearError } = positionsSlice.actions;
export default positionsSlice.reducer;
