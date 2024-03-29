import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";

function Navbar() {
  const { loggedIn, user } = useAuth();//
  const { items } = useBasket();
  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <Link to="/">eCommance</Link>
          </div>
          <ul className={styles.menu}>
            <li>
              <Link to="/">Products</Link>
            </li>
          </ul>
        </div>

        <div className={styles.right}>
          {!loggedIn && (
            <>
              <Link to="/singup">
                <Button colorScheme="pink">Register</Button>
              </Link>
              <Link to="/singin">
                <Button colorScheme="pink">Login</Button>
              </Link>
            </>
          )}
          {loggedIn && (
            <>
            {
              items.length > 0 && (
                <Link to="/basket">
                  <Button colorScheme="pink" variant="outline">
                    Basket ({items.length})
                  </Button>
                </Link>
              )
            }

            {
              user?.role === "admin" && (
                <Link to="/admin">
                  <Button colorScheme="pink" variant="ghost">Admin</Button>
                </Link>
              )
            }
              <Link to="/profile">
                <Button>Profile</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
