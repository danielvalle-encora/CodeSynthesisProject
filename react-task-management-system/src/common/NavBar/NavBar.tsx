import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
//import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const NavBar: React.FC = () => {
    return (
        <>
        <nav className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
        </div>
        <ul className="space-y-2 p-4 flex-grow">
          <li>
            <Link to="/">
              <Button variant="ghost" className="w-full justify-start">
                {/* <LayoutDashboard className="mr-2 h-4 w-4" /> */}
                Dashboard
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/task">
              <Button variant="ghost" className="w-full justify-start">
                {/* <CheckSquare className="mr-2 h-4 w-4" /> */}
                Tasks
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <Button variant="ghost" className="w-full justify-start">
                {/* <UserCircle className="mr-2 h-4 w-4" /> */}
                Profile
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <Button variant="ghost" className="w-full justify-start">
                {/* <Settings className="mr-2 h-4 w-4" /> */}
                Settings
              </Button>
            </Link>
          </li>
        </ul>
        {/* User info and logout */}
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {/* <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar> */}
              <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-500">john.doe@gmail.com</p>
                {/* <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p> */}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            //   onClick={handleLogout}
              aria-label="Logout"
            >
              {/* <LogOut className="h-4 w-4 text-gray-500" /> */}
            </Button>
          </div>
        </div>
      </nav>
        </>
    )
}

export default NavBar