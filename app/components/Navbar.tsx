"use client";

import { cloneElement, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "@/app/components/Link";
import Logo from "./Logo";
import NavDrawer from "./NavDrawer";

function ElevationScroll({ children }: { children: React.ReactElement<{ elevation?: number }> }) {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  return cloneElement(children, { elevation: trigger ? 4 : 0 });
}

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar
            sx={{
              maxWidth: "lg",
              mx: "auto",
              width: "100%",
              px: { xs: 2, sm: 3 },
            }}
          >
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 1 }}
              aria-label="open navigation"
            >
              <MenuIcon />
            </IconButton>

            <ButtonBase
              component={Link}
              href="/"
              sx={{ borderRadius: 2, px: 1, py: 0.5, display: "flex", alignItems: "center", gap: 1 }}
            >
              <Logo size={28} />
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1, color: "inherit", letterSpacing: 0.5 }}>
                漢字
                <Box component="span" sx={{ fontWeight: 400, fontSize: "0.9rem", ml: 0.5, opacity: 0.9 }}>
                  カード
                </Box>
              </Typography>
            </ButtonBase>
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
