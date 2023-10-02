export type InputProps = Partial<Pick<HTMLInputElement, 'type' | 'value' | 'placeholder' | 'className'> & {
   name: string | number;
}>
