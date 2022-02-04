import { Box, Icon, IconButton } from '@mui/material';
import { addMonths, formatMonth } from './dateFunctions';
import { Link } from 'react-router-dom';
import { UserMenu } from './UserMenu';

interface ICalendarHeaderProps {
  month: string
  onSignOut: () => void
}

export function CalendarHeader(props: ICalendarHeaderProps) {

  const { month, onSignOut } = props

  return (
    <Box display='flex' alignItems='center' padding='8px 16px'>
      <Box>
        <IconButton aria-label='Mês anterior' component={Link} to={"/calendar/" + addMonths(month, -1)}>
          <Icon>chevron_left</Icon>
        </IconButton>
        <IconButton aria-label='Próximo mês' component={Link} to={"/calendar/" + addMonths(month, 1)}>
          <Icon>chevron_right</Icon>
        </IconButton>
      </Box>
      <Box flex='1' marginLeft='16px' component='h3'>{ formatMonth(month) }</Box>
      <UserMenu 
        onSignOut={onSignOut}
      />
    </Box>
  )
}
