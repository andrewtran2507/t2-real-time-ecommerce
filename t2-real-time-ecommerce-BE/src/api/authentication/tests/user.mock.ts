import { User } from '../../user/entities/user.entity';
import { Role } from '../../role/entities/role.entity';

const mockedUser: User = {
  id: 'adasdad123213123adasd',
  email: 'user@email.com',
  name: 'John',
  password: 'hash',
  orders: [],
  role: new Role,
  created_at: undefined,
  updated_at: undefined,
  deleted_at: undefined,
  is_activated: false
};

export default mockedUser;
