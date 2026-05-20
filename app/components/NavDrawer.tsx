"use client";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Link from "@/app/components/Link";
import Logo from "./Logo";

const LEVELS = [
  { id: "n5", label: "N5", description: "Beginner",           color: "success" as const },
  { id: "n4", label: "N4", description: "Elementary",          color: "info"    as const },
  { id: "n3", label: "N3", description: "Intermediate",        color: "warning" as const },
  { id: "n2", label: "N2", description: "Upper Intermediate",  color: "secondary" as const },
  { id: "n1", label: "N1", description: "Advanced",            color: "error"   as const },
] as const;

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NavDrawer({ open, onClose }: Props) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 260, display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 2.5,
            py: 2,
            bgcolor: "primary.main",
            color: "primary.contrastText",
          }}
        >
          <Logo size={28} />
          <Typography variant="h6" fontWeight={600}>
            漢字カード
          </Typography>
        </Box>

        <Divider />

        {/* JLPT Levels */}
        <Box sx={{ px: 2, pt: 2, pb: 0.5 }}>
          <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1 }}>
            JLPT Levels
          </Typography>
        </Box>

        <List disablePadding>
          {LEVELS.map(({ id, label, description, color }) => (
            <ListItem key={id} disablePadding>
              <ListItemButton
                component={Link}
                href={`/level/${id}`}
                onClick={onClose}
                sx={{ px: 2.5, py: 1 }}
              >
                <ListItemIcon sx={{ minWidth: 44 }}>
                  <Chip label={label} color={color} size="small" sx={{ fontWeight: 700, minWidth: 36 }} />
                </ListItemIcon>
                <ListItemText
                  primary={description}
                  slotProps={{ primary: { variant: "body2" } }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ mx: 2.5 }} />

        {/* All levels */}
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              href="/level/all"
              onClick={onClose}
              sx={{ px: 2.5, py: 1 }}
            >
              <ListItemIcon sx={{ minWidth: 44 }}>
                <Chip label="All" color="primary" size="small" sx={{ fontWeight: 700, minWidth: 36 }} />
              </ListItemIcon>
              <ListItemText
                primary="All Levels"
                slotProps={{ primary: { variant: "body2" } }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
