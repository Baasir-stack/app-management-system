export const isErrorWithMessage = (error: unknown): error is { message: string } => {
    return (error as { message: string }).message !== undefined;
  };
  