declare global {
    type ReactNode =
        | React.ReactElement<unknown>
        | FunctionComponent<unknown>
        | React.ComponentClass<unknown>
        | null

        interface IKeyValue {
            [key: string]: any; 
          }

          interface ErrorResponse {
            data: {
              message: string;
            };
          }
          

   
}

export { }
