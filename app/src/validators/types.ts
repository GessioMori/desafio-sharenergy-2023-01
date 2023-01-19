import { FieldValues, ResolverResult, ResolverOptions } from "react-hook-form";
import { z } from "zod";

export type Resolver = <T extends z.Schema<any, any>>(
  schema: T,
  schemaOptions?: Partial<z.ParseParams>,
  factoryOptions?: {
    mode?: "async" | "sync";
    rawValues?: boolean;
  }
) => <TFieldValues extends FieldValues, TContext>(
  values: TFieldValues,
  context: TContext | undefined,
  options: ResolverOptions<TFieldValues>
) => Promise<ResolverResult<TFieldValues>>;
