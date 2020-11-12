type Url = string;
interface Config<TData> {
  data: TData;
}

interface IFetchAPI {
  get<R extends any, D extends any>(url: Url, config?: Config<D>): Promise<R>;
}

class FetchAPI implements IFetchAPI {
  get = async <R extends any, D extends any>(url: Url, config?: Config<D>): Promise<R> => {
    const res = await fetch(url, {
      body: JSON.stringify(config?.data),
    });
    return res.json();
  };
}

const fetchAPI = new FetchAPI();

export default fetchAPI;
