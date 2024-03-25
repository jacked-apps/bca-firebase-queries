import { toast } from 'react-toastify';
import { Team } from '../../../bca-admin-dashboard-trio/src/assets/typesFolder/teamTypes';

export type HookProps<T> = {
  useToast?: boolean;
  successToastLength?: number;
  successMessage?: string;
  failedMessage?: string;
  onFetchSuccess?: (data: T) => void;
};

export const mutationConfig = <T>(props: HookProps<T>) => ({
  onSuccess: (data: T) => {
    const toastOptions = props.successToastLength
      ? { autoClose: props.successToastLength }
      : {};
    if (props.useToast) toast.success(props.successMessage, toastOptions);
    if (props.onFetchSuccess) props.onFetchSuccess(data);
  },
  onError: (error: unknown) => {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred.';
    toast.error(props.failedMessage + errorMessage);
  },
});
