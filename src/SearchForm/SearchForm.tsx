import { useRef, useState } from 'react';
import clsx from 'clsx';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';

import { Result } from './types';
import { Selected } from './Selected';
import { Results } from './Results';
import useOnClickOutside from './useOnClickOutside';
import useStyles from './useStyles';

const searchHandler = async (query: string): Promise<Result[]> => {
  try {
    const respone = await fetch(`https://restcountries.com/v3.1/name/${query}`);
    const data = await respone.json();
    return data.map((country: any) => ({
      id: country.fifa,
      value: country.name.common,
    }));
  } catch (error) {
    return [];
  }
};

const TYPING_TIMEOUT = 1000; // ms

export const SearchForm: React.FC = () => {
  const classes = useStyles();
  const rootEl = useRef<HTMLDivElement>(null);
  const inputEl = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [selected, setSelected] = useState<Result[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useOnClickOutside(rootEl, () => {
    setIsActive(false);
  });

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value: currValue } = event.target;
    setValue(currValue);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = window.setTimeout(() => {
      if (!currValue || currValue.trim().length === 0) return;
      setIsLoading(true);
      searchHandler(currValue).then((response) => {
        setResults(response);
        setIsLoading(false);
      });
    }, TYPING_TIMEOUT);

    setTypingTimeout(timeout);
  }

  function onClear() {
    setValue('');
    if (inputEl.current) {
      inputEl.current.focus();
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(selected);
  }

  function onSelectResult(value: Result) {
    setSelected([...selected, value]);
  }

  function onRemoveSelected(value: Result) {
    setSelected(
      selected.filter((currSelected) => currSelected.id !== value.id)
    );
  }

  function onFocus() {
    setIsActive(true);
  }

  const hasSelection = selected.length >= 1;
  const shouldShowResults = results.length >= 1 && isActive;

  return (
    <div
      ref={rootEl}
      className={clsx({
        [classes.root]: true,
        [classes.hasResults]: shouldShowResults,
      })}
    >
      {hasSelection && <Selected data={selected} onRemove={onRemoveSelected} />}
      {shouldShowResults && (
        <Results data={results} selected={selected} onSelect={onSelectResult} />
      )}

      <form className={classes.form} onSubmit={onSubmit}>
        <InputBase
          value={value}
          onChange={onChange}
          className={classes.formInput}
          onFocus={onFocus}
          placeholder="Search country"
          inputProps={{
            ref: inputEl,
            autoCorrect: 'off',
            spellCheck: false,
            'aria-label': 'search',
          }}
          endAdornment={
            value ? (
              <EndAdornment isLoading={isLoading} onClear={onClear} />
            ) : null
          }
        />

        <IconButton
          disableRipple
          disableFocusRipple
          aria-label="submit"
          type="submit"
        >
          <SearchIcon />
        </IconButton>
      </form>
    </div>
  );
};

interface EndAdornmentProps {
  isLoading: boolean;
  onClear: () => any;
}
const EndAdornment: React.FC<EndAdornmentProps> = (props) => {
  const { onClear, isLoading } = props;

  if (isLoading) {
    return <CircularProgress size={20} />;
  }

  return (
    <IconButton
      disableRipple
      disableFocusRipple
      aria-label="clear"
      size="small"
      onClick={onClear}
    >
      <CloseIcon />
    </IconButton>
  );
};
