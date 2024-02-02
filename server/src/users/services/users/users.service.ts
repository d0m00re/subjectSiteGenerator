import { Injectable } from '@nestjs/common';
import { IUserCreate } from 'src/users/utils/types';

@Injectable()
export class UsersService {
    private fakeUsers = [{
        username :"jackouille",
        email : "johnson@gmx.com"
    }, {
        username :"john snow",
        email : "johnsnow@gmx.com"
    }, {
        username :"samy",
        email : "samy@gmx.com"
    }, {
        username :"marie",
        email : "marie@gmx.com"
    }];
    fetchUsers() {
        return this.fakeUsers;
    }

    createUser(user : IUserCreate) {
        this.fakeUsers.push(user);
        return user;
    }

    getUserById(id : number) {
        return {
            id: id, username :"john", email : "jack@med.com"
        }
    }
}
