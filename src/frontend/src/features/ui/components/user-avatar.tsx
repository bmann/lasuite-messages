import type { ComponentPropsWithRef } from "react";

import { UserAvatar as LasuiteUserAvatar } from "@gouvfr-lasuite/ui-components";

export type UserAvatarSize = "xsmall" | "small" | "medium" | "large";

const AVATAR_PX: Record<UserAvatarSize, number> = {
  xsmall: 16,
  small: 20,
  medium: 24,
  large: 32,
};

type UserAvatarProps = Omit<
  ComponentPropsWithRef<typeof LasuiteUserAvatar>,
  "size"
> & {
  fullName?: string;
  /**
   * Avatar image URL (from the AIP OIDC `picture` claim). When present the
   * image is shown with the initials circle as a fallback (OVHP-126).
   */
  avatarUrl?: string | null;
  size?: UserAvatarSize;
};

/**
 * Avatar that prefers the OIDC `picture` image and falls back to the lasuite
 * initials circle. Copy of the Docs `UserAvatar` pattern so Messages shows
 * user avatars where they're known (IM chat, assignees, people pickers).
 */
export const UserAvatar = ({
  fullName,
  avatarUrl,
  size = "medium",
  ...props
}: UserAvatarProps) => {
  if (avatarUrl) {
    const px = AVATAR_PX[size] ?? AVATAR_PX.medium;
    return (
      <img
        className={`c__avatar ${size}`}
        src={avatarUrl}
        alt=""
        aria-hidden="true"
        style={{
          width: px,
          height: px,
          borderRadius: "50%",
          objectFit: "cover",
        }}
        {...props}
      />
    );
  }
  return <LasuiteUserAvatar fullName={fullName ?? ""} size={size} {...props} />;
};
