import { User } from 'models/auth/User';
import { AuthService } from 'app/components/auth/auth.service';

export class MockAuthService {
    public user: User;
    public token: string;

    constructor() {
        this.user = {
            username: 'Test',
            email: 'test@test.com'
        };

        this.token = '';
    }
}

export const MOCK_AUTH_PROVIDER: object = {
    provide: AuthService,
    useClass: MockAuthService
};
