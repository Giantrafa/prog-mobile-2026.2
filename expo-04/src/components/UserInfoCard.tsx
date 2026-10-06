import { Card, List } from 'react-native-paper';

import type { User } from '@/api/types';

function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  return Number.isNaN(date.getTime()) ? isoDate : date.toLocaleDateString('pt-BR');
}

export function UserInfoCard({ user }: { user: User }) {
  return (
    <Card mode="elevated">
      <Card.Title title="Seus dados" />
      <Card.Content>
        <List.Item
          title="Nome"
          description={user.name}
          left={(props) => <List.Icon {...props} icon="account-outline" />}
        />
        <List.Item
          title="E-mail"
          description={user.email}
          left={(props) => <List.Icon {...props} icon="email-outline" />}
        />
        {user.createdAt && (
          <List.Item
            title="Membro desde"
            description={formatDate(user.createdAt)}
            left={(props) => <List.Icon {...props} icon="calendar-outline" />}
          />
        )}
        <List.Item
          title="ID"
          description={`#${user.id}`}
          left={(props) => <List.Icon {...props} icon="identifier" />}
        />
      </Card.Content>
    </Card>
  );
}
